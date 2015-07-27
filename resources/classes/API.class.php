<?php


class GenerateDataAPI extends API
{
    public function data() {

        if ($this->method !== "POST") {
            return array("error" => "Sorry, this endpoint only accepts POST requests. Please see the help documentation.");
        }

        // validate the incoming JSON data to ensure its valid
        $error = Utils::validateJSON($this->rawRequest);
        if ($error) {
            return array("error" => ErrorCodes::API_INVALID_JSON, "error_details" => $error);
        }

        $json = @json_decode($this->rawRequest);

        // validate the JSON contains the appropriate settings for the Code
        $errors = $this->validateCoreSettings($json);
        if ($errors) {
            return $errors;
        }
        $errors = $this->validateDataTypeSettings($json);
        if ($errors) {
            return $errors;
        }
        $errors = $this->validateExportTypeSettings($json);
        if ($errors) {
            return $errors;
        }

        // okay! Now we generate whatever data was requested
        $gen = new DataGenerator(Constants::GEN_ENVIRONMENT_API, $json);
        $response = $gen->generate();

        if ($response["success"]) {
            return $response;
        }
    }


    // --------------------------------------------------------------------------------------------
    // helpers

    /**
     * The bare minimum valid JSON structure for the core is an object with the following keys:
     * {
     *   "numRows": N, // where N is a number > 0
     *   "rows": []    // must be an array
     *   "export": {}  // must be an object
     * }
     *
     * Additional finer-tuned validation is performed later on.
     * @param $json
     * @return array
     */
    private function validateCoreSettings($json) {
        if (!property_exists($json, "numRows")) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "Missing `numRows` property");
        }
        if (!is_int($json->numRows) || $json->numRows < 1) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "The `numRows` property must be an integer >= 1");
        }
        if (!property_exists($json, "rows")) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "Missing `rows` property");
        }
        if (!is_array($json->rows)) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "The `rows` property must be an array");
        }
        if (!property_exists($json, "export")) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "Missing `export` property");
        }
        if (!is_object($json->export)) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "The `export` property must be an object");
        }
    }

    /**
     * Alrighty, now we get fancy! This examines the contents of the `rows` property, which is an array of data type
     * rows. Most Data Type has its own settings schema which we need to validate against. All this function does
     * is return whatever errors occurred; if everything checks out, it returns nothing.
     * @param $json
     * @return array
     */
    private function validateDataTypeSettings($json) {
        $dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);
        $schemaFiles = DataTypePluginHelper::getSchemaFiles($dataTypes);
        $dataTypeFolders = DataTypePluginHelper::getDataTypeFolders(Core::$dataTypePlugins);

        $rows = $json->rows;
        $numRows = count($rows);
        for ($i=0; $i<$numRows; $i++) {
            $dataType = $rows[$i]->type;

            // check the Data Type folder name is valid. Note: we just compare against the list of all possible
            // Data Types, not those that have schemas. Not all Data Types have a schema: some, like Email, are simple
            // and have no settings
            if (!in_array($dataType, $dataTypeFolders)) {
                return array(
                    "error" => ErrorCodes::API_UNKNOWN_DATA_TYPE,
                    "error_details" => "invalid `type` attribute: `$dataType`",
                    "location" => "index $i of the `rows` array"
                );
            }

            // check the Data Type has a title
            if (!property_exists($rows[$i], "title")) {
                return array(
                    "error" => ErrorCodes::API_MISSING_DATA_TYPE_TITLE,
                    "error_details" => "Missing `title` attribute",
                    "location" => "index $i of the `rows` array"
                );
            }

            // if the schema file exists for the Data Type, validate against it
            if (array_key_exists($dataType, $schemaFiles)) {
                $schema = json_decode($schemaFiles[$dataType]);
                $json   = property_exists($rows[$i], "settings") ? $rows[$i]->settings : json_decode("{}");

                // verify the settings for this data type
                $result = Jsv4::validate($json, $schema);

                if ($result->valid) {
                    continue;
                }

                // ladies and gentleman, we have an error! Return as much user friendly information to the user
                // to help them locate the problem
                return array(
                    "error" => ErrorCodes::API_INVALID_DATA_TYPE_JSON,
                    "error_details" => "Invalid Data Type JSON `settings` content passed",
                    "validation_error" => $result->errors[0]->message,
                    "location" => "index $i of the `rows` array",
                    "data_type" => $dataType
                );
            }
        }
    }

    /**
     * Examines the contents of the `export` property, which is an object of the following form:
     * { type: "N", settings: {} }. "N" is the folder name of the desired Export Type (see
     * /plugins/axportTypes); `settings` is an object containing whatever settings have been specified by that
     * Export Type's schema.json file.
     * @param $json
     * @return array
     */
    private function validateExportTypeSettings($json) {

        // first, find the Export Type and check it's valid
        if (!property_exists($json->export, "type")) {
            return array(
                "error" => ErrorCodes::API_INVALID_JSON_CONTENT,
                "error_details" => "Missing `type` property in the `export` object"
            );
        }

        $exportTypeFolders = ExportTypePluginHelper::getExportTypeFolders();
        $exportType = $json->export->type;
        if (!in_array($exportType, $exportTypeFolders)) {
            return array(
                "error" => ErrorCodes::API_UNKNOWN_EXPORT_TYPE,
                "error_details" => "invalid `type` attribute of the `export` object: `$exportType`"
            );
        }

        $exportType = ExportTypePluginHelper::getExportTypeByFolder($exportType);
        $schema = json_decode($exportType->getSchema());

        // only validate if there's actually a schema for this Export Type
        if ($schema !== null) {
            $json = property_exists($json->export, "settings") ? $json->export->settings : json_decode("{}");

            // verify the settings for this data type
            $result = Jsv4::validate($json, $schema);
            if (!$result->valid) {
                return array(
                    "error" => ErrorCodes::API_INVALID_EXPORT_TYPE_JSON,
                    "error_details" => "Invalid Export Type JSON `settings` content passed",
                    "path" => $result->errors[0]->dataPath,
                    "validation_error" => $result->errors[0]->message
                );
            }
        }
    }
}

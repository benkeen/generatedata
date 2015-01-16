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
        $rows = $json->rows;

        $dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);
        $schemaFiles = DataTypePluginHelper::getSchemaFiles($dataTypes);
        $dataTypeFolders = DataTypePluginHelper::getDataTypeFolders(Core::$dataTypePlugins);

        $numRows = count($rows);
        for ($i=0; $i<$numRows; $i++) {
            $dataType = $rows[$i]->type;

            // check the Data Type folder name is valid. Note: we just compare against the list of all possible
            // Data Types, not those that have schemas. Not all Data Types have a schema: some, like Email, are simple
            // and have no settings
            if (!in_array($dataType, $dataTypeFolders)) {
                return array(
                    "error" => ErrorCodes::API_UNKNOWN_DATA_TYPE,
                    "error_details" => "invalid `type` attribute: `$dataType` on index $i of the `rows` array. This should be a Data Type folder name." . implode(", ", $dataTypeFolders) . "..."
                );
            }

            if (property_exists($rows[$i], "settings") && array_key_exists($dataType, $schemaFiles)) {

                // assumption is the our own schema files are valid
                $schema = $schemaFiles[$dataType];
                $json   = $rows[$i]->settings;
                $result = Jsv4::validate($json, $schema);

                return json_decode($result);
            }
        }
    }

    /**
     * Examines the contents of the `export` property, which is an array of data type rows. Each Data Type has its own
     * settings schema which we need to validate against.
     * @param $json
     */
    private function validateExportTypeSettings($json) {
        $export = $json->export;
    }
}

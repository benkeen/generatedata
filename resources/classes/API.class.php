<?php

/*

*/
class GenerateDataAPI extends API
{
    public function data() {

        // validate the incoming JSON data to ensure it's valid
        $errors = $this->validateJSON();
        if ($errors) {
            return $errors;
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

    private function validateJSON() {
        if ($this->method !== "POST") {
            return array("error" => "Sorry, this endpoint only accepts POST requests. Please see the help documentation.");
        }

        // try decoding the input to see if it's valid or not
        $data = @json_decode($this->rawRequest);
        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            $errorMessage = Utils::getJSONErrorMessage(json_last_error());
            return array("error" => ErrorCodes::API_INVALID_JSON, "error_details" => $errorMessage);
        }
    }

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
        if (!is_array($json->numRows)) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "The `rows` property must be an array");
        }
        if (!property_exists($json, "export")) {
            return array("error" => ErrorCodes::API_INVALID_JSON_CONTENT, "error_details" => "Missing `export` property");
        }
    }

    /**
     * Alrighty, now we get fancy! This examines the contents of the `rows` property, which is an array of data type
     * rows. Each Data Type has its own settings schema which we need to validate against.
     * @param $json
     */
    private function validateDataTypeSettings($json) {
        $rows = $json->rows;
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

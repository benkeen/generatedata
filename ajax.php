<?php

/**
 * This handles all Ajax requests for the Data Generator Core. Note that we only include the library.php
 * here, we don't Core::init(). Depending on the context (e.g. installation), that may not be desired.
 */
require_once(realpath(dirname(__FILE__) . "/library.php"));

// sessions needed here AFTER installation, to get access to $user [or should it be passed &
// validated with all requests?]
header("Cache-Control: private, no-cache, must-revalidate");

$ajaxRequest = new AjaxRequest(@$_POST["action"], $_POST);
$response = $ajaxRequest->getResponse();
$response["content"] = utf8_encode($response["content"]);
$encoded = json_encode($response);

$errorCode = json_last_error();
if ($errorCode) {

	switch ($errorCode) {
        case JSON_ERROR_NONE:
            echo ' - No errors';
        	break;
        case JSON_ERROR_DEPTH:
            echo ' - Maximum stack depth exceeded';
        	break;
        case JSON_ERROR_STATE_MISMATCH:
            echo ' - Underflow or the modes mismatch';
        	break;
        case JSON_ERROR_CTRL_CHAR:
            echo ' - Unexpected control character found';
        	break;
        case JSON_ERROR_SYNTAX:
            echo ' - Syntax error, malformed JSON';
        	break;
        case JSON_ERROR_UTF8:
            echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
        	break;
        default:
            echo ' - Unknown error';
        	break;
    }
} else {
	echo $encoded;
}
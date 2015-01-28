<?php

require_once("../library.php");
Core::init("generation");

if (!Core::isApiEnabled()) {
	echo "Sorry, the API is not enabled.";
	return;
}

// requests from the same server don't have a HTTP_ORIGIN header
if (!array_key_exists("HTTP_ORIGIN", $_SERVER)) {
    $_SERVER["HTTP_ORIGIN"] = $_SERVER["SERVER_NAME"];
}


try {
    $API = new GenerateDataAPI($_REQUEST["request"]);
    $response = $API->processAPI();

    // if an error was returned, output it in JSON format
    if ($response["error"]) {
        header("Content-Type: application/json");
        echo json_encode($response);
    } else {

        // Export Types may choose to return a "headers" string or array containing headers to output
        if ($response["contentTypeHeader"]) {
            header("Content-Type: {$response["contentTypeHeader"]}");
        }
        echo $response["content"];
    }

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

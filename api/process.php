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

// nope!
header("Content-Type: application/json");

try {
    $API = new GenerateDataAPI($_REQUEST["request"]);
    $response = $API->processAPI();

    if ($response["error"]) {
        echo json_encode($response);
    } else {
        echo $response["content"];
    }

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

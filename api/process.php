<?php

require_once("../library.php");
Core::init();

if (!Core::isApiEnabled()) {
	echo "Sorry, the API is not enabled.";
	return;
}

// requests from the same server don't have a HTTP_ORIGIN header
if (!array_key_exists("HTTP_ORIGIN", $_SERVER)) {
    $_SERVER["HTTP_ORIGIN"] = $_SERVER["SERVER_NAME"];
}

header("Content-Type: application/json");

try {
    $API = new GenerateDataAPI($_REQUEST["request"]);
    echo json_encode($API->processAPI());
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

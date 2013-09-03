<?php

require_once(realpath(dirname(__FILE__) . "/library.php"));

Core::init("generation");
$gen = new GeneratorX($_POST);
$response = $gen->generate();

if ($gen->getExportTarget() == "promptDownload") {
	header("Cache-Control: private, no-cache, must-revalidate");
	header("Content-Type: {$response["contentTypeHeader"]}");
}

if (isset($response["promptDownloadFilename"]) && !empty($response["promptDownloadFilename"])) {
	header("Content-Disposition: attachment; filename={$response["promptDownloadFilename"]}");
}

echo $response["content"];

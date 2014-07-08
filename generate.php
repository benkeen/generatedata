<?php

require_once(__DIR__ . "/library.php");

Core::init("generation");
$gen = new DataGenerator($_POST);
$response = $gen->generate();

if ($gen->getExportTarget() == "promptDownload") {
	header("Cache-Control: private, no-cache, must-revalidate");
	
	// check if user opted to zip the generated data
	if ($gen->isPromptDownloadZipped()) {
		$randNum = mt_rand(0, 100000000);
		$fileName = $randNum . "_" . $response["promptDownloadFilename"];
		$zipPath  = $filePath . ".zip";

		if (file_put_contents($fileName, $response["content"])) {

			// now that we've written the file, zip it up
			$zip = new ZipArchive();
			$zipFile = $zip->open($zipPath, ZipArchive::CREATE);
			if ($zipFile && $zip->addFile($fileName, $response["promptDownloadFilename"])) {

				// we've got our zip file now we may set the response header
				$zip->close();
				header("Content-type: application/zip");
				header("Content-Disposition: attachment; filename=" . $response["promptDownloadFilename"] . ".zip");
				readfile($zipPath);
				unlink($zipPath);
				unlink($fileName);
				exit;
			}
		}

	// no compression, send the original data back
	} else {
		header("Content-Type: {$response["contentTypeHeader"]}");

		if (isset($response["promptDownloadFilename"]) && !empty($response["promptDownloadFilename"])) {
			header("Content-Disposition: attachment; filename={$response["promptDownloadFilename"]}");
		}
		echo $response["content"];
	}
} else {
	echo $response["content"];
}

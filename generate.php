<?php

require_once(__DIR__ . "/library.php");

Core::init("generation");
$gen = new DataGenerator($_POST);
$response = $gen->generate();

if ($gen->getExportTarget() == "promptDownload") {
	header("Cache-Control: private, no-cache, must-revalidate");
	
	//check if user selected the zip checkbox and zip
	if($gen->isPromptDownloadZipped()){
		$filename=session_id()."_".$response["promptDownloadFilename"];
		$filepath=$filename;
		$zippath=$filepath.".zip";
		if(file_put_contents($filepath,$response["content"])){
			//now that you've written the file proceed to zip it
			$zip = new ZipArchive();
			//we'll use the session key of the user to keep it clean. no mixups of datasets. hopefully they won't try this with multiple tabs!
			$zipfile = $zip->open($zippath,ZipArchive::CREATE);
			if($zipfile){
				if ($zip->addFile($filepath,$response["promptDownloadFilename"])){
					//we've got our zip file now we may set the response header
					$zip->close();
					header("Content-type: application/zip"); 
					header("Content-Disposition: attachment; filename=".$response["promptDownloadFilename"].".zip");
					readfile($zippath);
					unlink($zippath);
					unlink($filepath);
					//exit sending the zip back
					exit;
				}
			}
		}
	}
	else{//no compression, send the original data back
		header("Content-Type: {$response["contentTypeHeader"]}");
		if (isset($response["promptDownloadFilename"]) && !empty($response["promptDownloadFilename"])) {
        		header("Content-Disposition: attachment; filename={$response["promptDownloadFilename"]}");
		}
		echo $response["content"];
	}
}

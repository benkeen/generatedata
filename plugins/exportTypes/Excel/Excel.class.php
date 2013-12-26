<?php

/**
 * @package ExportTypes
 */

class Excel extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "Excel";
	protected $jsModules = array("Excel.js");
	protected $compatibleExportTargets = array("promptDownload");
	public $L = array();
	private $chars;
	private $charArray;


	function generate($generator) {
		require_once("PHPExcel.php");

		$data = $generator->generateExportData();
		$this->chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$this->charArray = str_split($this->chars, 1);

		$objPHPExcel = new PHPExcel();

		// set document properties
		$objPHPExcel->getProperties()->setTitle("Test Data");

		// create a first sheet and populate the headings
		$objPHPExcel->setActiveSheetIndex(0);

		// hardcoded limitation of 26 x 27 columns (right now)
		$numCols = count($data["colData"]);
		for ($i=0; $i<$numCols; $i++) {
			$col = $this->getExcelCol($i, 1);
			$objPHPExcel->getActiveSheet()->setCellValue($col, $data["colData"][$i]);
		}

		for ($i=0; $i<count($data["rowData"]); $i++) {
			for ($j=0; $j<$numCols; $j++) {
				$col = $this->getExcelCol($j, $i+2);
				$objPHPExcel->getActiveSheet()->setCellValue($col, $data["rowData"][$i][$j]);
			}
		}
		
		//We'll need to check if the compression option is turned on. And then execute this code - unullmass

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		//get the name of the save file
		$filepath=$this->getDownloadFilename($generator);
		//save the excel data to that file
		$objWriter->save($filepath);
		if(!($generator->isPromptDownloadZipped())){
		
			// redirect output to a client’s web browser (Excel5)
			header('Content-Type: application/vnd.ms-excel');
			header('Content-Disposition: attachment;filename="'.$filepath.'"');
			header('Cache-Control: max-age=0');
			readfile($filepath);

		}else{
			//create archive and send back
			$zippath=$filepath.".zip";
			$zip = new ZipArchive();
			$zipfile = $zip->open($zippath,ZipArchive::CREATE);
			if($zipfile){
				if ($zip->addFile($filepath,$filepath)){
					//we've got our zip file now we may set the response header
					$zip->close();
					header("Cache-Control: private, no-cache, must-revalidate");
					header("Content-type: application/zip"); 
					header('Content-Disposition: attachment; filename="'.$filepath.'.zip"');
					readfile($zippath);
					unlink($zippath);
					unlink($filepath);
					//exit sending the zip back
					exit;
				}
			}
		}
	}

	private function getExcelCol($index, $row) {
		$remainder = floor($index / 26) - 1;
		if ($remainder == -1) {
			$firstColChar = "";
		} else {
			$firstColChar = $this->charArray[$remainder];
		}
		$secondColChar = $this->charArray[$index % 26];
		return "{$firstColChar}{$secondColChar}$row";
	}

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return session_id()."data{$time}.xls";
	}
}

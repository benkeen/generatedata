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

		// redirect output to a client’s web browser (Excel5)
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="01simple.xls"');
		header('Cache-Control: max-age=0');

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		$objWriter->save('php://output');
		exit;
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
		return "data{$time}.xls";
	}
}
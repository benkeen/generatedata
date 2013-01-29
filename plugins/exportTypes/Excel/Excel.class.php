<?php

/**
 * @package ExportTypes
 */

class Excel extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "Excel";
	protected $jsModules = array("Excel.js");
	public $L = array();

	function generate($generator) {
		require_once("PHPExcel.php");

		$data = $generator->generateExportData();

print_r($data);
exit;

		// Create new PHPExcel object
		$objPHPExcel = new PHPExcel();

		// Set document properties
		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
		                             ->setLastModifiedBy("Maarten Balliauw")
		                             ->setTitle("Office 2007 XLSX Test Document")
		                             ->setSubject("Office 2007 XLSX Test Document")
		                             ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
		                             ->setKeywords("office 2007 openxml php")
		                             ->setCategory("Test result file");


		// Create a first sheet
		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->setCellValue('A1', "Firstname");
		$objPHPExcel->getActiveSheet()->setCellValue('B1', "Lastname");
		$objPHPExcel->getActiveSheet()->setCellValue('C1', "Phone");
		$objPHPExcel->getActiveSheet()->setCellValue('D1', "Fax");
		$objPHPExcel->getActiveSheet()->setCellValue('E1', "Is Client ?");


		// Add data
		for ($i = 2; $i <= 1000; $i++) {
		    $objPHPExcel->getActiveSheet()->setCellValue('A' . $i, "FName $i")
		                                  ->setCellValue('B' . $i, "LName $i")
		                                  ->setCellValue('C' . $i, "PhoneNo $i")
		                                  ->setCellValue('D' . $i, "FaxNo $i")
		                                  ->setCellValue('E' . $i, true);
		}


		// Set active sheet index to the first sheet, so Excel opens this as the first sheet
		$objPHPExcel->setActiveSheetIndex(0);


		// Redirect output to a client’s web browser (Excel5)
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="01simple.xls"');
		header('Cache-Control: max-age=0');

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		$objWriter->save('php://output');
		exit;

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
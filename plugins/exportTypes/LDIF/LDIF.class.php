<?php

/**
 * @author Marco Corona <coronam@allegheny.edu>
 * @package ExportTypes
 */
class LDIF extends ExportTypePlugin {

    protected $isEnabled = true;
    protected $exportTypeName = "LDIF";
    protected $jsModules = array("LDIF.js");

    public function generate($generator) {
        $postData = $generator->getPostData();
        $content  = $this->generateLDIF($generator, $postData);

		return array(
			"success" => true,
			"content" => $content
		);
    }

    public function getDownloadFilename($generator) {
        $time = date("M-j-Y");
		return "data{$time}.ldif";
    }
    
	private function generateLDIF($generator, $postData) {
		$data = $generator->generateExportData();
		$numCols = count($data["colData"]);
		$content = "";
		foreach ($data["rowData"] as $row) {
			for ($i=0; $i<$numCols; $i++) {
				$content .= "{$data["colData"][$i]}:{$row[$i]}\n";
			}
			$content .= "\n";
		}
		return $content;
	}
}
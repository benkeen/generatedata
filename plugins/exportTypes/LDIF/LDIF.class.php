<?php

/**
 * @author Marco Corona <coronam@allegheny.edu>
 * @package ExportTypes
 */
class LDIF extends ExportTypePlugin {

    protected $isEnabled = true;
    protected $exportTypeName = "LDIF";

    public function generate($generator) {
        $content  = $this->generateLDIF($generator);

		return array(
			"success" => true,
			"content" => $content
		);
    }

    public function getDownloadFilename($generator) {
        $time = date("M-j-Y");
		return "data{$time}.ldif";
    }
    
	private function generateLDIF($generator) {
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

<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package ExportTypes
 */
class JSON extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "JSON";
	protected $jsModules = array("JSON.js");
	protected $codeMirrorModes = array("javascript");
	protected $contentTypeHeader = "text/json";
	public $L = array();


	public function generate($generator) {
		$exportTarget = $generator->getExportTarget();
		$postData     = $generator->getPostData();
		$data         = $generator->generateExportData();

		$stripWhitespace     = isset($postData["etJSON_stripWhitespace"]);
		$dataStructureFormat = isset($postData["etJSON_dataStructureFormat"]) ? $postData["etJSON_dataStructureFormat"] : "complex";

		$content = "";
		if ($dataStructureFormat == "complex") {
			$content = $this->generateComplex($generator, $data, $stripWhitespace);
		} else {
			$content = $this->generateSimple($generator, $data, $stripWhitespace);
		}

		return array(
			"success" => true,
			"content" => $content
		);
	}

	private function generateSimple($generator, $data, $stripWhitespace) {
		$newline = ($stripWhitespace) ? "" : "\n";
		$tab     = ($stripWhitespace) ? "" : "\t";
		$space   = ($stripWhitespace) ? "" : " ";

		$content = "";
		if ($generator->isFirstBatch()) {
			$content .= "[$newline";
		}
		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i=0; $i<$numRows; $i++) {
			$content .= "{$tab}{{$newline}";

			$pairs = array();
			for ($j=0; $j<$numCols; $j++) {
				$varName = preg_replace('/"/', '\"', $data["colData"][$j]);
				$pairs[] = "{$tab}{$tab}\"$varName\":{$space}\"{$data["rowData"][$i][$j]}\"";
			}
			$content .= implode(",$newline", $pairs);

			if ($data["isLastBatch"] && $i == $numRows - 1) {
				$content .= "{$newline}{$tab}}$newline";
			} else {
				$content .= "{$newline}{$tab}},$newline";
			}
		}

		if ($generator->isLastBatch()) {
			$content .= "]";
		}

		return $content;
	}


	private function generateComplex($generator, $data, $stripWhitespace) {
		$content = "";
		if ($generator->isFirstBatch()) {
			$quotedCols = Utils::enquoteArray($data["colData"]);
			if ($stripWhitespace) {
				$cols = implode(",", $quotedCols);
				$content .= "{\"cols\":[$cols],\"data\":[";
			} else {
				$cols = implode(",\n\t\t", $quotedCols);
				$content .= "{\n\t\"cols\": [\n\t\t$cols\n\t],\n\t\"data\": [\n";
			}
		}

		$numItems = count($data["rowData"]);
		for ($i=0; $i<$numItems; $i++) {
			$rowValsArr = $data["rowData"][$i];
			$quotedRow = Utils::enquoteArray($rowValsArr);
			if ($stripWhitespace) {
				$rowVals = implode(",", $quotedRow);
				$content .= "[$rowVals]";
				if ($i < $numItems - 1) {
					$content .= ",";
				}
			} else {
				$rowVals = implode(",\n\t\t\t", $quotedRow);
				$content .= "\t\t[\n\t\t\t$rowVals\n\t\t]";
				if ($i < $numItems - 1) {
					$content .= ",\n";
				}
			}
		}

		if ($generator->isLastBatch()) {
			if ($stripWhitespace) {
				$content .= "]}";
			} else {
				$content .= "\n\t]\n}";
			}
		}
		return $content;
	}

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	public function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.json";
	}

	public function getAdditionalSettingsHTML() {
		$html =<<< END
	<input type="checkbox" name="etJSON_stripWhitespace" id="etJSON_stripWhitespace" value="1" />
		<label for="etJSON_stripWhitespace">{$this->L["strip_whitespace"]}</label><br />
	{$this->L["data_structure_format"]}
		<input type="radio" name="etJSON_dataStructureFormat" value="complex" id="stJSON_dataStructureFormat1" checked="checked" />
			<label for="stJSON_dataStructureFormat1">{$this->L["complex"]}</label>
		<input type="radio" name="etJSON_dataStructureFormat" value="simple" id="stJSON_dataStructureFormat2" />
			<label for="stJSON_dataStructureFormat2">{$this->L["simple"]}</label>
END;
		return $html;
	}
}

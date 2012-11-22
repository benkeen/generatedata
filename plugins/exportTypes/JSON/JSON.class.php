<?php


class JSON extends ExportTypePlugin {
	protected $exportTypeName = "JSON";
	protected $jsModules = array("JSON.js");
	protected $codeMirrorModes = array("javascript");
	protected $contentTypeHeader = "text/json";
	public $L = array();

	function generate($generator) {
		$exportTarget = $generator->getExportTarget();
		$postData     = $generator->getPostData();
		$data         = $generator->generateExportData();

		$stripWhitespace = isset($postData["etJSON_stripWhitespace"]);

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

		return array(
			"success" => true,
			"content" => $content
		);
	}

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.json";
	}

	function getAdditionalSettingsHTML() {
		$html =<<< END
	<input type="checkbox" name="etJSON_stripWhitespace" id="etJSON_stripWhitespace" value="1" />
		<label for="etJSON_stripWhitespace">Strip whitespace from generated results</label>
END;
		return $html;
	}
}

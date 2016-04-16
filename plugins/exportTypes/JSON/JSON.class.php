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
	protected $contentTypeHeader = "text/json; charset=utf-8";
	public $L = array();

	private $numericFields;


	public function generate($generator) {
		$this->genEnvironment = $generator->genEnvironment; // API / POST
		$this->userSettings   = $generator->getUserSettings();

		$data         = $generator->generateExportData();
		$template     = $generator->getTemplateByDisplayOrder();
		$stripWhitespace     = $this->shouldStripWhitespace();
		$dataStructureFormat = $this->getDataStructureFormat();

		// figure out which fields are strictly numeric. We don't wrap those values in double quotes
		$this->determineNumericFields($template);

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
		$tab = ($stripWhitespace) ? "" : "\t";
		$space = ($stripWhitespace) ? "" : " ";

		$nested = array();

		$content = "";
		$comma = "";
		if ($generator->isFirstBatch()) {
			$content .= "[";
		} else {
			$comma = ",";
		}

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i = 0; $i < $numRows; $i++) {
			$content .= "{$comma}{$newline}{$tab}{";
			$comma = "";

			for ($j = 0; $j < $numCols; $j++) {
				$varName = preg_replace('/"/', '\"', $data["colData"][$j]);

				// x.y.z field names => Nested JSON
				$levels = explode(".", $varName);
				$fieldName = array_pop($levels);

				// How many nested levels match the previous column?
				for ($k = 0; $k < count($levels) && $k < count($nested) && $nested[$k] === $levels[$k]; $k++) {
				}

				// Pop closing levels
				while (count($nested) > $k) {
					$content .= $newline . str_repeat($tab, count($nested) + 1) . "}";
					array_pop($nested);
					$comma = ",";
				}

				// Push new nested levels
				for ($l = $k; $l < count($levels); $l++) {
					$lev = $levels[$l];
					array_push($nested, $lev);
					$content .= "{$comma}{$newline}" . str_repeat($tab, $l + 2) . "\"{$lev}\":{$space}{";
					$comma = "";
				}

				$value = $data["rowData"][$i][$j];
				if (!($this->numericFields[$j] && is_numeric($value))) $value = "\"$value\"";
				$content .= "{$comma}{$newline}" . str_repeat($tab, count($nested) + 2) . "\"{$fieldName}\":{$space}{$value}";
				$comma = ",";
			}

			// Pop all levels
			while (count($nested) > 0) {
				$content .= $newline . str_repeat($tab, count($nested) + 1) . "}";
				array_pop($nested);
			}

			$content .= "{$newline}{$tab}}";
			$comma = ",";
		}

		if ($generator->isLastBatch()) {
			$content .= "{$newline}]";
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

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);
		for ($i=0; $i<$numRows; $i++) {
			$rowValsArr = array();
			for ($j=0; $j<$numCols; $j++) {
				if ($this->numericFields[$j] && is_numeric($data["rowData"][$i][$j])) {
					$rowValsArr[] = $data["rowData"][$i][$j];
				} else {
					$rowValsArr[] = "\"" . $data["rowData"][$i][$j] . "\"";
				}
			}

			if ($stripWhitespace) {
				$rowVals = implode(",", $rowValsArr);
				$content .= "[$rowVals]";
				if ($i < $numRows - 1) {
					$content .= ",";
				}
			} else {
				$rowVals = implode(",\n\t\t\t", $rowValsArr);
				$content .= "\t\t[\n\t\t\t$rowVals\n\t\t]";

				if ($i < $numRows - 1) {
					$content .= ",\n";
				} else if (!$generator->isLastBatch()) {
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


	/**
	 * Wrapper function to find out whether the user wants whitespace to be enabled or not. The settings content
	 * is either JSON or a POST array, depending on where the generation is taking place.
	 */
	private function shouldStripWhitespace() {
		$default = false;
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$jsonSettings = $this->userSettings->export->settings;
			$stripWhitespace = (property_exists($jsonSettings, "stripWhitespace")) ? $jsonSettings->stripWhitespace : $default;
		} else {
			$stripWhitespace = isset($this->userSettings["etJSON_stripWhitespace"]);
		}
		return $stripWhitespace;
	}

	/**
	 * Returns the desired JSON data structure format - simple or complex.
	 * @return string
	 */
	private function getDataStructureFormat() {
		$default = "complex";
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$jsonSettings = $this->userSettings->export->settings;
			$format = (property_exists($jsonSettings, "dataStructureFormat")) ? $jsonSettings->dataStructureFormat : $default;
		} else {
			$format = isset($this->userSettings["etJSON_dataStructureFormat"]) ? $this->userSettings["etJSON_dataStructureFormat"] : $default;
		}
		return $format;
	}

	private function determineNumericFields($template) {
		foreach ($template as $item) {
			$this->numericFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "numeric";
		}
	}
}

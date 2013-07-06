<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package ExportTypes
 */
class ProgrammingLanguage extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "Programming Language";
	protected $jsModules = array("ProgrammingLanguage.js");
	protected $codeMirrorModes = array("php", "perl", "htmlmixed", "xml", "javascript", "css", "clike", "ruby");

	public $L = array();

	private $numericFields;


	public function generate($generator) {
		$postData     = $generator->getPostData();
		$data         = $generator->generateExportData();
		$template     = $generator->getTemplateByDisplayOrder();
		$language = $postData["etProgrammingLanguage_language"];

		foreach ($template as $item) {
			$this->numericFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "numeric";
		}

		$content = "";
		switch ($language) {
			case "JavaScript":
				$content .= $this->generateJS($data);
				break;
			case "Perl":
				$content .= $this->generatePerl($data);
				break;
			case "PHP":
				$content .= $this->generatePHP($data);
				break;
			case "Ruby":
				$content .= $this->generateRuby($data);
				break;
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
	public function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.";
	}

	public function getAdditionalSettingsHTML() {
		$html =<<< END
	{$this->L["language"]}:
	<select name="etProgrammingLanguage_language" id="etProgrammingLanguage_language">
		<option value="JavaScript">JavaScript</option>
		<option value="Perl">Perl</option>
		<option value="PHP">PHP</option>
		<option value="Ruby">Ruby</option>
	</select>
END;
		return $html;
	}


	private function generatePerl($data) {
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "@data = (\n";
		}

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i=0; $i<$numRows; $i++) {
			$content .= "\t{";

			$pairs = array();
			for ($j=0; $j<$numCols; $j++) {
				$varName = preg_replace('/"/', '\"', $data["colData"][$j]);
				if ($this->numericFields[$j]) {
					$pairs[] = "\"$varName\" => {$data["rowData"][$i][$j]}";
				} else {
					$pairs[] = "\"$varName\" => \"{$data["rowData"][$i][$j]}\"";
				}
			}
			$content .= implode(",", $pairs);

			if ($data["isLastBatch"] && $i == $numRows - 1) {
				$content .= "}\n";
			} else {
				$content .= "},\n";
			}
		}

		if ($data["isLastBatch"]) {
			$content .= ");";
		}
		return $content;
	}


	private function generatePHP($data) {
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "<?" . "php\n\n\$data = array(\n";
		}

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i=0; $i<$numRows; $i++) {
			$content .= "\tarray(";

			$pairs = array();
			for ($j=0; $j<$numCols; $j++) {
				if ($this->numericFields[$j]) {
					$pairs[] = "\"{$data["colData"][$j]}\"=>{$data["rowData"][$i][$j]}";
				} else {
					$pairs[] = "\"{$data["colData"][$j]}\"=>\"{$data["rowData"][$i][$j]}\"";
				}
			}
			$content .= implode(",", $pairs);

			if ($data["isLastBatch"] && $i == $numRows - 1) {
				$content .= ")\n";
			} else {
				$content .= "),\n";
			}
		}

		if ($data["isLastBatch"]) {
			$content .= ");\n\n?>";
		}
		return $content;
	}


	private function generateJS($data) {
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "var data = [\n";
		}

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i=0; $i<$numRows; $i++) {
			$content .= "\t{";

			$pairs = array();
			for ($j=0; $j<$numCols; $j++) {
				if ($this->numericFields[$j]) {
					$pairs[] = "\"{$data["colData"][$j]}\": {$data["rowData"][$i][$j]}";
				} else {
					$pairs[] = "\"{$data["colData"][$j]}\": \"{$data["rowData"][$i][$j]}\"";
				}
			}
			$content .= implode(", ", $pairs);

			if ($data["isLastBatch"] && $i == $numRows - 1) {
				$content .= "}\n";
			} else {
				$content .= "},\n";
			}
		}

		if ($data["isLastBatch"]) {
			$content .= "];\n";
		}
		return $content;
	}


	private function generateRuby($data) {
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "data = [\n";
		}

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i=0; $i<$numRows; $i++) {
			$content .= "\t{";

			$pairs = array();
			for ($j=0; $j<$numCols; $j++) {
				if ($this->numericFields[$j]) {
					$pairs[] = "'{$data["colData"][$j]}': {$data["rowData"][$i][$j]}";
				} else {
					$pairs[] = "'{$data["colData"][$j]}': '{$data["rowData"][$i][$j]}'";
				}
			}
			$content .= implode(", ", $pairs);

			if ($data["isLastBatch"] && $i == $numRows - 1) {
				$content .= "}\n";
			} else {
				$content .= "},\n";
			}
		}

		if ($data["isLastBatch"]) {
			$content .= "];\n";
		}
		return $content;
	}

}


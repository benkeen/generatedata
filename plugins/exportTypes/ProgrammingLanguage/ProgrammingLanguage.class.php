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
	private $dateFormats;


	public function generate($generator) {
		$this->genEnvironment = $generator->genEnvironment; // API / POST
		$this->userSettings   = $generator->getUserSettings();
		$data     = $generator->generateExportData();
		$template = $generator->getTemplateByDisplayOrder();
		$language = $this->getLanguage();

		foreach ($template as $item) {
			$this->numericFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "numeric";
            
            if(isset($item["columnMetadata"]["type"]) 
                && isset($item["columnMetadata"]["formatCode"]) 
                && $item["columnMetadata"]["type"] == "date") {
			     $this->dateFormats[] = $item["columnMetadata"]["formatCode"];
            } else { 
                $this->dateFormats[] = "";
            }
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
			case "CSharp":
				$content .= $this->generateCSharp($data);
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
		<option value="CSharp">C# (anonymous object)</option>
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
	
    private $sharpDateFormats = array (
        "m/d/Y" => "MM/dd/yyyy",
        "d/m/Y" => "dd/MM/yyyy",
        "m.d.y" => "MM.dd.yy",
        "d.m.y" => "dd.MM.yy",
        "d-m-y" => "dd-MM-yy",
        "m-d-y" => "MM-dd-yy",
        "d.m.Y" => "dd.MM.yyyy"
    );

    
	private function generateCSharp($data) {
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "var data = new [] {\n";
		}

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i=0; $i<$numRows; $i++) {
			$content .= "\tnew { ";

			$pairs = array();
			for ($j=0; $j<$numCols; $j++) {
				$propName = str_replace(' ', '', $data["colData"][$j]);
				if ($this->numericFields[$j]) {
					$pairs[] = "{$propName} = {$data["rowData"][$i][$j]}";
				} else if (isset($this->sharpDateFormats[$this->dateFormats[$j]])) {
					$pairs[] = "{$propName} = DateTime.ParseExact(\"{$data["rowData"][$i][$j]}\", \"{$this->sharpDateFormats[$this->dateFormats[$j]]}\", CultureInfo.InvariantCulture)";
				} else {
					$pairs[] = "{$propName} = \"{$data["rowData"][$i][$j]}\"";
				}
			}
			$content .= implode(", ", $pairs);

			if ($data["isLastBatch"] && $i == $numRows - 1) {
				$content .= " }\n";
			} else {
				$content .= " },\n";
			}
		}

		if ($data["isLastBatch"]) {
			$content .= "};\n";
		}
		return $content;
	}

	private function getLanguage() {
		$language = "";
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$language = $this->userSettings->export->settings->language;
		} else {
			$language = $this->userSettings["etProgrammingLanguage_language"];
		}
		return $language;
	}
}


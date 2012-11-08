<?php

class DataType_TextFixed extends DataTypePlugin {
	protected $dataTypeName = "Fixed Number of Words";
	protected $dataTypeFieldGroup = "text";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("TextFixed.js");

	private $helpDialogWidth = 370;
	private $words;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->words = Utils::getLipsum();
		}
	}

	public function generate($row, $options, $existingRowData) {
		return Utils::generateRandomTextStr($this->words, false, "fixed", $options);
	}

	public function getRowGenerationOptions($postdata, $column, $numCols) {
		if (empty($postdata["dtNumWords_$column"])) {
			return false;
		}
		return $postdata["dtNumWords_$column"];
	}

	public function getOptionsColumnHTML() {
		$html =<<<END
&nbsp;{$this->L["TextFixed_generate"]} #<input type="text" name="dtNumWords_%ROW%" id="dtNumWords_%ROW%" style="width: 30px" value="10" />
{$this->L["TextFixed_words"]}
END;
		return $html;
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>{$this->L["TextFixed_help"]}</p>"
		);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite") {
					$info = "TEXT default NULL";
				} else if ($options == "Oracle") {
					$info = "BLOB default NULL";
				}
				break;
		}

		return $info;
	}


}

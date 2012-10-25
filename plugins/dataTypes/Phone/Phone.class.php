<?php

class DataType_Phone extends DataTypePlugin {

	protected $dataTypeName = "Phone / Fax";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("Phone.js");
	private $helpDialogWidth = 450;


	public function generate($rowNum, $placeholderStr, $existingRowData) {
		$phoneStr = Utils::generateRandomAlphanumericStr($placeholderStr);
		$formats = explode("|", $phoneStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[rand(0, count($formats)-1)];
		}
		return $chosenFormat;
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "varchar(100) default NULL";
				else if ($options == "Oracle")
					$info = "varchar2(100) default NULL";
				break;
		}

		return $info;
	}

	public function getRowGenerationOptions($post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<<EOF
	<select name="dt_%ROW%" id="dt_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="1-Xxx-Xxx-xxxx">{$this->L["Phone_example_1"]}</option>
		<option value="(Xxx) Xxx-xxxx">{$this->L["Phone_example_2"]}</option>
		<option value="1 Xx Xxx Xxxx-xxxx">{$this->L["Phone_uk"]}</option>
		<option value="1-Xxx-Xxx-xxxx|Xxx-xxxx">{$this->L["Phone_different_formats"]}</option>
	</select>
EOF;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html = '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
		return $html;
	}

	public function getHelpDialogInfo() {
		$html =<<<END
	<p>
		{$this->L["Phone_help_text1"]}
	</p>
	<p>
		{$this->L["Phone_help_text2"]}
	</p>
	<p>
		{$this->L["Phone_help_text3"]}
	</p>
END;

	    return array(
	      "dialogWidth" => $this->helpDialogWidth,
	      "content"     => $html
	    );
	}
}
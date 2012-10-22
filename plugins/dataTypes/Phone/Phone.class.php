<?php

class DataType_Phone extends DataTypePlugin {

	protected $dataTypeName = "Phone / Fax";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("Phone.js");

	private $helpDialogWidth = 450;


	public function generate($row, $options, $existingRowData) {
		$phone_str = gd_generate_random_num_str($options);

		// in case the user entered multiple | separated formats, pick one
		$formats = explode("|", $phone_str);
		$chosen_format = $formats[0];
		if (count($formats) > 1)
			$chosen_format = $formats[rand(0, count($formats)-1)];

		return $chosen_format;
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type)
		{
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "varchar(100) default NULL";
				else if ($options == "Oracle")
					$info = "varchar2(100) default NULL";
				break;
		}

		return $info;
	}

	public function getRowGenerationOptions($postdata, $column, $numCols) {
		if (empty($postdata["option_$col"]))
			return false;

		return $postdata["option_$col"];
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
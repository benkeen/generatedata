<?php

/**
 * @package DataTypes
 */

class DataType_Boolean extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Boolean";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 11;
	protected $jsModules = array("Boolean.js");


	public function generate($generator, $generationContextData) {
		$placeholderStr = $generationContextData["generationOptions"];

		// in case the user entered multiple | separated formats, pick one
		$formats = explode("|", $placeholderStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[mt_rand(0, count($formats)-1)];
		}

		return array(
			"display" => trim($chosenFormat)
		);
	}


	public function getRowGenerationOptionsUI($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		if (empty($json->settings->placeholder)) {
			return false;
		}
		return $json->settings->placeholder;
	}


	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255) default NULL",
			"SQLField_Oracle" => "varchar2(255) default NULL",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="Yes|No">{$this->L["example_YesNo"]}</option>
		<option value="False|True">{$this->L["example_FalseTrue"]}</option>
		<option value="0|1">{$this->L["example_ZeroOne"]}</option>
		<option value="Y|N">{$this->L["example_YesNoShort"]}</option>
		<option value="F|T">{$this->L["example_FalseTrueShort"]}</option>
		<option value="false|true">{$this->L["example_FalseTrueLower"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		return '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
	}


	public function getHelpHTML() {
		$content =<<<EOF
	<p>
	    {$this->L["DATA_TYPE"]["DESC"]}
		{$this->L["help_intro"]}
	</p>
EOF;

		return $content;
	}
}

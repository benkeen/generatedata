<?php

/**
 * @package DataTypes
 */

class DataType_Phone extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Phone / Fax";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("Phone.js");


	public function generate($generator, $generationContextData) {
		$phoneStr = Utils::generateRandomAlphanumericStr($generationContextData["generationOptions"]);
		$formats = explode("|", $phoneStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[mt_rand(0, count($formats)-1)];
		}
		return array(
			"display" => $chosenFormat
		);
	}

	public function getRowGenerationOptions($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<<EOF
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="1-Xxx-Xxx-xxxx">{$this->L["example_1"]}</option>
		<option value="(Xxx) Xxx-xxxx">{$this->L["example_2"]}</option>
		<option value="(01xxxx) xxxxx|(01xxx) xxxxxx|(01x1) xxx xxxx|(011x) xxx xxxx|(02x) xxxx xxxx|03xx xxx xxxx|055 xxxx xxxx|056 xxxx xxxx|070 xxxx xxxx|07624 xxxxxx|076 xxxx xxxx|07xxx xxxxxx|0800 xxx xxxx|08xx xxx xxxx|09xx xxx xxxx|(016977) xxxx|(01xxx) xxxxx|0500 xxxxxx|0800 xxxxxx|0800 1111|0845 46 4x">{$this->L["uk"]}</option>
		<option value="0X xx xx xx xx">{$this->L["france"]}</option>
		<option value="(0X) xxxx xxxx">{$this->L["australia"]}</option>
		<option value="(0xx) xxxxxxxx|(0xxx) xxxxxxxx|(0xxxx) xxxxxxx|(03xxxx) xxxxxx">{$this->L["germany"]}</option>
		<option value="0xx-xxx-xxxx">{$this->L["japan"]}</option>
		<option value="1-Xxx-Xxx-xxxx|Xxx-xxxx">{$this->L["different_formats"]}</option>
	</select>
EOF;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html = '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
		return $html;
	}

	public function getHelpHTML() {
		$html =<<<END
	<p>
		{$this->L["help_text1"]}
	</p>
	<p>
		{$this->L["help_text2"]}
	</p>
	<p>
		{$this->L["help_text3"]}
	</p>
END;

	    return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(100) default NULL",
			"SQLField_Oracle" => "varchar2(100) default NULL",
			"SQLField_MSSQL" => "VARCHAR(100) NULL"
		);
	}
}
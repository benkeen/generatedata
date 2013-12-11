<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_AlphaNumeric extends DataTypePlugin {

	/**#@+
     * @access protected
     */
	protected $isEnabled = true;
	protected $dataTypeName = "Alphanumeric";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("AlphaNumeric.js");


	public function generate($generator, $generationContextData) {
		$formats = explode("|", $generationContextData["generationOptions"]);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[mt_rand(0, count($formats)-1)];
		}
		$val = Utils::generateRandomAlphanumericStr($chosenFormat);
		return array(
			"display" => $val
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if (!isset($postdata["dtOption_$colNum"]) || empty($postdata["dtOption_$colNum"])) {
			return false;
		}
		return $postdata["dtOption_$colNum"];
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="LxL xLx">V6M 4C1 {$this->L["example_CanPostalCode"]}</option>
		<option value="xxxxx">90210 {$this->L["example_USZipCode"]}</option>
		<option value="LLLxxLLLxLL">eZg29gdF5K1 {$this->L["example_Password"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		return '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255)",
			"SQLField_Oracle" => "varchar2(255)",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getHelpHTML() {
		$content =<<<EOF
			<p>
				{$this->L["help_intro"]}
			</p>

			<table cellpadding="0" cellspacing="1" width="100%">
			<tr>
				<td width="20"><h4>L</h4></td>
				<td width="200">{$this->L["help_1"]}</td>
				<td width="20"><h4>V</h4></td>
				<td>{$this->L["help_2"]}</td>
			</tr>
			<tr>
				<td><h4>l</h4></td>
				<td>{$this->L["help_3"]}</td>
				<td><h4>v</h4></td>
				<td>{$this->L["help_4"]}</td>
			</tr>
			<tr>
				<td><h4>D</h4></td>
				<td>{$this->L["help_5"]}</td>
				<td><h4>F</h4></td>
				<td>{$this->L["help_6"]}</td>
			</tr>
			<tr>
				<td><h4>C</h4></td>
				<td>{$this->L["help_7"]}</td>
				<td><h4>x</h4></td>
				<td>{$this->L["help_8"]}</td>
			</tr>
			<tr>
				<td><h4>c</h4></td>
				<td>{$this->L["help_9"]}</td>
				<td><h4>X</h4></td>
				<td>{$this->L["help_10"]}</td>
			</tr>
			<tr>
				<td><h4>E</h4></td>
				<td>{$this->L["help_11"]}</td>
				<td><h4>H</h4></td>
				<td>{$this->L["help_12"]}</td>
			</tr>
			</table>
EOF;

		return $content;
	}


	public function getRestOptionsFormat() {
		return array(
			"key" => "options",
			"required" => true,
			"type" => "mixed"
		);
	}
}
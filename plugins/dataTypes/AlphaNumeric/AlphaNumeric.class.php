<?php


class DataType_AlphaNumeric extends DataTypePlugin {

	protected $dataTypeName = "Alphanumeric";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("AlphaNumeric.js");

	private $helpDialogWidth = 510;


	//	public function generate($rowNum, $options, $existingRowData) {
	public function generate($generator, $row, $placeholderStr, $existingRowData) {
		$formats = explode("|", $placeholderStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[rand(0, count($formats)-1)];
		}
		return Utils::generateRandomAlphanumericStr($chosenFormat);
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

	public function getHelpDialogInfo() {
		$L = Core::$language->getCurrentLanguageStrings();
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

		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => $content
		);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				$info = "varchar(255)";
				break;
		}
		return $info;
	}
}
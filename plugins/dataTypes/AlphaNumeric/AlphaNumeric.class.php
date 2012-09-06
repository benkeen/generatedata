<?php


class DataType_AlphaNumeric extends DataTypePlugin {

	protected $dataTypeName = "Alphanumeric";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 10;
	protected $includedFiles = array("AlphaNumeric.js");

	private $helpDialogWidth = 460;


	public function generateItem($row, $placeholderStr, $existingRowData) {
		$formats = explode("|", $placeholderStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[rand(0, count($formats)-1)];
		}
		return Utils::generateRandomAlphanumericStr($chosenFormat);
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

	public function getTemplateOptions($postdata, $col, $num_cols) {
		if (!isset($postdata["option_$col"]) || empty($postdata["option_$col"])) {
			return false;
		}
		return $postdata["option_$col"];
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="LxL xLx">V6M 4C1 {$this->L["AlphaNumeric_example_CanPostalCode"]}</option>
		<option value="xxxxx">90210 {$this->L["AlphaNumeric_example_USZipCode"]}</option>
		<option value="LLLxxLLLxLL">eZg29gdF5K1 {$this->L["AlphaNumeric_example_Password"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		return '<input type="text" name="option_%ROW%" id="option_%ROW% style="width: 267px" />';
	}

	public function getHelpDialogInfo() {
		$L = Core::$language->getCurrentLanguageStrings();
		$content =<<<EOF
			<p>
				{$this->L["AlphaNumeric_help_intro"]}
			</p>

			<table cellpadding="0" cellspacing="1" width="100%">
			<tr>
				<td class="heading_1" width="20">L</td>
				<td width="200">{$this->L["AlphaNumeric_help_1"]}</td>
				<td class="heading_1" width="20">V</td>
				<td>{$this->L["AlphaNumeric_help_2"]}</td>
			</tr>
			<tr>
				<td class="heading_1">l</td>
				<td>{$this->L["AlphaNumeric_help_3"]}</td>
				<td class="heading_1">v</td>
				<td>{$this->L["AlphaNumeric_help_4"]}</td>
			</tr>
			<tr>
				<td class="heading_1">D</td>
				<td>{$this->L["AlphaNumeric_help_5"]}</td>
				<td class="heading_1">F</td>
				<td>{$this->L["AlphaNumeric_help_6"]}</td>
			</tr>
			<tr>
				<td class="heading_1">C</td>
				<td>{$this->L["AlphaNumeric_help_7"]}</td>
				<td class="heading_1">x</td>
				<td>{$this->L["AlphaNumeric_help_8"]}</td>
			</tr>
			<tr>
				<td class="heading_1">c</td>
				<td>{$this->L["AlphaNumeric_help_9"]}</td>
				<td class="heading_1">X</td>
				<td>{$this->L["AlphaNumeric_help_10"]}</td>
			</tr>
			<tr>
				<td class="heading_1">E</td>
				<td>{$this->L["AlphaNumeric_help_11"]}</td>
				<td class="heading_1">H</td>
				<td>{$this->L["AlphaNumeric_help_12"]}</td>
			</tr>
			</table>
EOF;

		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => $content
		);
	}
}

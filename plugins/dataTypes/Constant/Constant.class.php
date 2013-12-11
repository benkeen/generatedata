<?php

/**
 * @package DataTypes
 */

class DataType_Constant extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Constant";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("Constant.js");
	protected $processOrder = 100;


	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		$rowNum  = $generationContextData["rowNum"];
		$numValues = count($options["values"]);
		if ($numValues == 1) {
			$value = $options["values"][0];
		} else {
			$itemIndex = floor(($rowNum-1) / $options["loopCount"]);
			if ($itemIndex > ($numValues - 1)) {
				$itemIndex = ($itemIndex % $numValues);
			}
			$value = $options["values"][$itemIndex];
		}
		return array(
			"display" => $value
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if (!isset($postdata["dtOption_$colNum"])) {
			return false;
		}

		// fix for https://github.com/benkeen/generatedata/issues/166
		$optionValue = trim($postdata["dtOption_$colNum"]);
		if ($optionValue == "") {
			return false;
		}

		if (!isset($postdata["dtConstantLoopCount_$colNum"]) || empty($postdata["dtConstantLoopCount_$colNum"])) {
			return false;
		}
		$loopCount = trim($postdata["dtConstantLoopCount_$colNum"]);
		if (!is_numeric($loopCount) || $loopCount <= 0) {
			return false;
		}

		$options = array(
			"loopCount" => $loopCount,
			"values"    => explode("|", $postdata["dtOption_$colNum"])
		);

		return $options;
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		return $L["see_help_dialog"];
	}

	public function getOptionsColumnHTML() {
		$html =<<<EOF
<table cellspacing="0" cellpadding="0" width="260">
	<tr>
		<td>{$this->L["loop_count"]}</td>
		<td><input type="text" name="dtConstantLoopCount_%ROW%" id="dtConstantLoopCount_%ROW%" size="5" value="10" /></td>
	</tr>
	<tr>
		<td>{$this->L["values"]}</td>
		<td><input name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 100%" /></td>
	</tr>
</table>
EOF;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "TEXT default NULL",
			"SQLField_Oracle" => "BLOB default NULL",
			"SQLField_MSSQL" => "VARCHAR(MAX) NULL",
			"SQLField_Postgres" => "TEXT NULL"
		);
	}

	public function getHelpHTML() {
		$html =<<< END
	<p>
		{$this->L["help_1"]}
	</p>
	<ul>
		<li>{$this->L["help_2"]}</li>
		<li>{$this->L["help_3"]}</li>
		<li>{$this->L["help_4"]}</li>
	</ul>
	<p>
		{$this->L["help_5"]}
	</p>
END;

		return $html;
	}
}

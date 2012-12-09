<?php

/**
 * @package DataTypes
 */

class DataType_Constant extends DataTypePlugin {
	protected $dataTypeName = "Constant";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("Constant.js");
	protected $processOrder = 100;
	private $helpDialogWidth = 460;


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
		if (!isset($postdata["dtOption_$colNum"]) || empty($postdata["dtOption_$colNum"])) {
			return false;
		}
		if (!isset($postdata["dtLoopCount_$colNum"]) || empty($postdata["dtLoopCount_$colNum"])) {
			return false;
		}
		if (!is_numeric($postdata["dtLoopCount_$colNum"]) || $postdata["dtLoopCount_$colNum"] <= 0) {
			return false;
		}

		$options = array(
			"loopCount" => $postdata["dtLoopCount_$colNum"],
			"values"    => explode("|", $postdata["dtOption_$colNum"])
		);
		return $options;
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		return $L["see_help_popup"];
	}

	public function getOptionsColumnHTML() {
		$html =<<<EOF
<table cellspacing="0" cellpadding="0" width="260">
	<tr>
		<td>{$this->L["loop_count"]}</td>
		<td><input type="text" name="dtLoopCount_%ROW%" id="dtLoopCount_%ROW%" size="5" value="10" /></td>
	</tr>
	<tr>
		<td>{$this->L["values"]}</td>
		<td><input name="dtOption_%ROW%" id="option_%ROW%" style="width: 100%" /></td>
	</tr>
</table>
EOF;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "TEXT default NULL",
			"SQLField_Oracle" => "BLOB default NULL"
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

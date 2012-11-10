<?php


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
		$num_values = count($options["values"]);
		if ($num_values == 1) {
			$value = $options["values"][0];
		} else {
			$item_index = floor(($row-1) / $options["loop_count"]);
			if ($item_index > ($num_values - 1)) {
				$item_index = ($item_index % $num_values);
			}
			$value = $options["values"][$item_index];
		}
		return $value;
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

	public function getRowGenerationOptions($generator, $postdata, $column, $numCols) {
		if (!isset($postdata["dtOption_$col"]) || empty($postdata["dtOption_$col"])) {
			return false;
		}
		if (!isset($postdata["dtLoopCount_$col"]) || empty($postdata["dtLoopCount_$col"])) {
			return false;
		}
		if (!is_numeric($postdata["dtLoopCount_$col"]) || $postdata["dtLoopCount_$col"] <= 0) {
			return false;
		}

		$options = array(
			"loopCount" => $postdata["dtLoopCount_$col"],
			"values"     => explode("|", $postdata["dtOption_$col"])
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

	public function getHelpDialogInfo() {
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

		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => $html
		);
	}
}

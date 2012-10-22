<?php


class DataType_Composite extends DataTypePlugin {

	protected $dataTypeName = "Composite";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("Composite.js");
	protected $processOrder = 100;

	private $helpDialogWidth = 520;

	public function generate($row, $placeholderStr, $existingRowData) {
		global $Composite_smarty;

		$placeholders = array();
		foreach ($existing_row_data as $row_info)
		{
			$column_number = $row_info["column_num"];
			$random_data   = is_array($row_info["random_data"]) ? $row_info["random_data"]["display"] : $row_info["random_data"];
			$placeholders["ROW{$column_number}"] = $random_data;
		}

		$curr_folder = dirname(__FILE__);
		$Composite_smarty->template_dir = realpath("$curr_folder/../../code/smarty");
		$Composite_smarty->compile_dir  = realpath("$curr_folder/../../cache");
		while (list($key, $value) = each($placeholders))
			$Composite_smarty->assign($key, $value);

		$Composite_smarty->assign("eval_str", $options);
		$output = $Composite_smarty->fetch("eval.tpl");

		return $output;
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type)
		{
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "TEXT default NULL";
				else if ($options == "Oracle")
					$info = "BLOB default NULL";
				break;
		}

		return $info;
	}

	public function getRowGenerationOptions($postdata, $col, $num_cols) {
		if (!isset($postdata["option_$col"]) || empty($postdata["option_$col"])) {
			return false;
		}

		return $postdata["option_$col"];
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		return $L["see_help_popup"];
	}

	public function getOptionsColumnHTML() {
		return '<textarea name="dtOption_%ROW%" id="dtOption_%ROW%" style="height: 70px; width: 260px"></textarea>';
	}

	public function getHelpDialogInfo() {
		$content =<<< END
	<p>
		{$this->L["Composite_help_1"]}
	</p>
	<p>
		{$this->L["Composite_help_2"]}
	</p>
	<p>
		{$this->L["Composite_help_3"]}
	</p>
	<ul>
		<li>{$this->L["Composite_help_4"]}</li>
		<li>{$this->L["Composite_help_5"]}
			<ul>
				<li><b>{\$ROW2-\$ROW1}</b> - {$this->L["Composite_subtraction"]}</li>
				<li><b>{\$ROW2*\$ROW1}</b> - {$this->L["Composite_multiplication"]}</li>
				<li><b>{\$ROW2/\$ROW1}</b> - {$this->L["Composite_division"]}</li>
			</ul>
		</li>
		<li>
			{$this->L["Composite_help_6"]}
			<b>{if \$ROW1 == 5}{$this->L["Composite_na"]}{else}{\$ROW1}{/if}</b>
		</li>
	</ul>
	<p>
		{$this->L["Composite_help_7"]}
	</p>
END;

		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => $content
		);
	}
}

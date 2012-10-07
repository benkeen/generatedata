<?php

class DataType_NumberRange extends DataTypePlugin {
	protected $dataTypeName = "Number Range";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 30;
	protected $jsModules = array("NumberRange.js");

	private $helpDialogWidth = 320;


	public function generateItem($row, $options, $existingRowData) {
		return rand($options["min"], $options["max"]);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type)
		{
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "mediumint default NULL";
				else if ($options == "Oracle")
					$info = "varchar2(50) default NULL";
				break;
		}

		return $info;
	}

	public function getTemplateOptions($postdata, $column, $numCols) {
		if ((empty($postdata["dtNumRangeMin_$col"]) && $postdata["dtNumRangeMin_$col"] !== "0") ||
				(empty($postdata["dtNumRangeMax_$col"]) && $postdata["dtNumRangeMax_$col"] !== "0"))
			return false;

		if (!is_numeric($postdata["dtNumRangeMin_$col"]) || !is_numeric($postdata["dtNumRangeMax_$col"]))
			return false;


		$options = array(
			"min" => $postdata["dtNumRangeMin_$col"],
			"max" => $postdata["dtNumRangeMax_$col"]
		);

		return $options;
	}

	public function getOptionsColumnHTML() {
		$html =<<<END
&nbsp;{$this->L["between"]} <input type="text" name="dtNumRangeMin_%ROW%" id="dtNumRangeMin_%ROW%" style="width: 30px" value="1" />
{$this->L["and"]} <input type="text" name="dtNumRangeMax_%ROW%" id="dtNumRangeMax_%ROW%" style="width: 30px" value="10" />
END;
		return $html;
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>{$this->L["NumberRange_help"]}</p>"
		);
	}
}

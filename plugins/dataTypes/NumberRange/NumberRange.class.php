<?php

/**
 * @package DataTypes
 */

class DataType_NumberRange extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Number Range";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 30;
	protected $jsModules = array("NumberRange.js");


	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		return array(
			"display" => mt_rand($options["min"], $options["max"])
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $column, $numCols) {
		if ((empty($postdata["dtNumRangeMin_$column"]) && $postdata["dtNumRangeMin_$column"] !== "0") ||
			(empty($postdata["dtNumRangeMax_$column"]) && $postdata["dtNumRangeMax_$column"] !== "0")) {
			return false;
		}
		if (!is_numeric($postdata["dtNumRangeMin_$column"]) || !is_numeric($postdata["dtNumRangeMax_$column"])) {
			return false;
		}
		$options = array(
			"min" => $postdata["dtNumRangeMin_$column"],
			"max" => $postdata["dtNumRangeMax_$column"]
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

	public function getDataTypeMetadata() {
		return array(
			"type" => "numeric",
			"SQLField" => "mediumint default NULL",
			"SQLField_Oracle" => "varchar2(50) default NULL",
			"SQLField_MSSQL" => "INTEGER NULL",
			"SQLField_Postgres" => "integer NULL"
		);
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help"]}</p>";
	}
}

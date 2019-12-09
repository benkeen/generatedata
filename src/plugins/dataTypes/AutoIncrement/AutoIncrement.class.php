<?php

/**
 * @package DataTypes
 */


class DataType_AutoIncrement extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "AutoIncrement";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("AutoIncrement.js");


	public function generate($generator, $generationContextData) {
		$rowSettings = $generationContextData["generationOptions"];
		$start       = $rowSettings["start"];
		$increment   = $rowSettings["increment"];
		$placeholder = $rowSettings["placeholder"];

		$val = (($generationContextData["rowNum"]-1) * $increment) + $start;

		if (!empty($placeholder)) {
			$val = preg_replace('/\{\$INCR\}/', $val, $placeholder);
		}

		return array(
			"display" => $val
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $col, $num_cols) {
		$start = isset($postdata["dtAutoIncrementStart_$col"]) ? $postdata["dtAutoIncrementStart_$col"] : null;
		$end   = isset($postdata["dtAutoIncrementValue_$col"]) ? $postdata["dtAutoIncrementValue_$col"] : null;

		if ($start == null || $end == null || $start == "") {
			return false;
		}

		$options = array(
			"start"       => $postdata["dtAutoIncrementStart_$col"],
			"increment"   => $postdata["dtAutoIncrementValue_$col"],
			"placeholder" => $postdata["dtAutoIncrementPlaceholder_$col"]
		);

		return $options;
	}

	// the API schema validation takes care of validation for us
	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		return array(
			"start"       => $json->settings->incrementStart,
			"increment"   => $json->settings->incrementValue,
			"placeholder" => property_exists($json->settings, "incrementPlaceholder") ? $json->settings->incrementPlaceholder : ""
		);
	}



	public function getDataTypeMetadata() {
		return array(
			"type" => "numeric",
			"SQLField" => "mediumint",
			"SQLField_Oracle" => "number default NULL",
			"SQLField_MSSQL" => "INTEGER NULL",
			"SQLField_Postgres" => "integer NULL"
		);
	}
}

<?php

/**
 * @package DataTypes
 */

class DataType_Phone extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Phone / Fax";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("Phone.js");


	public function generate($generator, $generationContextData) {
		$phoneStr = Utils::generateRandomAlphanumericStr($generationContextData["generationOptions"]);
		$formats = explode("|", $phoneStr);
		$chosenFormat = $formats[0];

		$numFormats = count($formats);
		if ($numFormats > 1) {
			$chosenFormat = $formats[mt_rand(0, $numFormats-1)];
		}
		return array(
			"display" => $chosenFormat
		);
	}

	public function getRowGenerationOptionsUI($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		return $json->settings->placeholder;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(100) default NULL",
			"SQLField_Oracle" => "varchar2(100) default NULL",
			"SQLField_MSSQL" => "VARCHAR(100) NULL"
		);
	}
}

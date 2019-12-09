<?php

/**
 * @package DataTypes
 */

class DataType_Boolean extends DataTypePlugin
{

	protected $isEnabled = true;
	protected $dataTypeName = "Boolean";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 11;
	protected $jsModules = array("Boolean.js");


	public function generate($generator, $generationContextData)
	{
		$placeholderStr = $generationContextData["generationOptions"];

		// in case the user entered multiple | separated formats, pick one
		$formats = explode("|", $placeholderStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[mt_rand(0, count($formats) - 1)];
		}

		return array(
			"display" => trim($chosenFormat)
		);
	}


	public function getRowGenerationOptionsUI($generator, $post, $colNum, $numCols)
	{
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols)
	{
		if (empty($json->settings->placeholder)) {
			return false;
		}
		return $json->settings->placeholder;
	}


	public function getDataTypeMetadata()
	{
		return array(
			"type" => "boolean",
			"SQLField" => "varchar(255) default NULL",
			"SQLField_Oracle" => "varchar2(255) default NULL",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}
}

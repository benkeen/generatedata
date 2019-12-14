<?php

/**
 * @package DataTypes
 */

class DataType_List extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Custom List";
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 40;
	protected $jsModules = array("List.js");


	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		$allElements = explode("|", $options["values"]);

		$val = "";
		if ($options["listType"] == "Exactly") {
			$val = implode(", ", Utils::returnRandomSubset($allElements, $options["number"]));
		} else {
			// at MOST. So randomly calculate a number up to the num specified
			$numItems = mt_rand(0, $options["number"]);
			$val = implode(", ", Utils::returnRandomSubset($allElements, $numItems));
		}

		return array(
			"display" => $val
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		if (empty($postdata["dtOption_$colNum"])) {
			return false;
		}

		$listType = $postdata["dtListType_$colNum"]; // Exactly or AtMost
		$number   = ($listType == "Exactly") ? $postdata["dtListExactly_$colNum"] : $postdata["dtListAtMost_$colNum"];
		$options = array(
			"listType" => $listType,
			"number"   => $number,
			"values"   => $postdata["dtOption_$colNum"]
		);

		return $options;
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$listType = $json->settings->listType; // Exactly or AtMost
		$number   = ($listType == "exactly") ? $json->settings->exactly : $json->settings->atMost;
		$options = array(
			"listType" => ucfirst($listType),
			"number"   => $number,
			"values"   => $json->settings->list
		);

		return $options;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255) default NULL",
			"SQLField_Oracle" => "varchar2(255) default NULL",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}
}

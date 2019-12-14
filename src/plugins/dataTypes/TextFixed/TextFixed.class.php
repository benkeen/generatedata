<?php

/**
 * @package DataTypes
 */

class DataType_TextFixed extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Fixed Number of Words";
	protected $dataTypeFieldGroup = "text";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("TextFixed.js");
	private $words;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->words = Utils::getLipsum();
		}
	}

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		$textStr = Utils::generateRandomTextStr($this->words, false, "fixed", $options);
		return array(
			"display" => $textStr
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		if (empty($postdata["dtNumWords_$colNum"])) {
			return false;
		}
		return $postdata["dtNumWords_$colNum"];
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		return $json->settings->numWords;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "TEXT default NULL",
			"SQLField_Oracle" => "BLOB default NULL",
			"SQLField_MSSQL" => "VARCHAR(MAX) NULL"
		);
	}
}

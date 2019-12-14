<?php

/**
 * @package DataTypes
 */

class DataType_TextRandom extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Random Number of Words";
	protected $dataTypeFieldGroup = "text";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("TextRandom.js");
	private $words;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->words = Utils::getLipsum();
		}
	}

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		$textStr = Utils::generateRandomTextStr($this->words, $options["startsWithLipsum"], "range", $options["numWordsMin"], $options["numWordsMax"]);
		return array(
			"display" => $textStr
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "TEXT default NULL",
			"SQLField_Oracle" => "BLOB default NULL",
			"SQLField_MSSQL" => "VARCHAR(MAX) NULL"
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $column, $numCols) {
		if (empty($postdata["dtNumWordsMin_$column"]) || empty($postdata["dtNumWordsMax_$column"])) {
			return false;
		}

		$options = array(
			"numWordsMin"      => $postdata["dtNumWordsMin_$column"],
			"numWordsMax"      => $postdata["dtNumWordsMax_$column"],
			"startsWithLipsum" => isset($postdata["dtStartsWithLipsum_$column"]) ? true : false
		);

		return $options;
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$options = array(
			"numWordsMin"      => $json->settings->minWords,
			"numWordsMax"      => $json->settings->maxWords,
			"startsWithLipsum" => $json->settings->startsWithLipsum
		);
		return $options;
	}
}

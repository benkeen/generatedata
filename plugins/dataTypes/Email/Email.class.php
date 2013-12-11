<?php

/**
 * @package DataTypes
 */


class DataType_Email extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Email";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 30;
	private $words;
	private $numWords;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->words = Utils::getLipsum();
			$this->numWords = count($this->words);
		}
	}

	public function generate($generator, $generationContextData) {
		// prefix
		$numPrefixWords = mt_rand(1, 3);
		$offset = mt_rand(0, $this->numWords - ($numPrefixWords + 1));
		$words = array_slice($this->words, $offset, $numPrefixWords);
		$words = preg_replace("/[,.:;]/", "", $words);
		$prefix = join(".", $words);

		// domain
		$numDomainWords = mt_rand(1, 3);
		$offset = mt_rand(0, $this->numWords - ($numDomainWords + 1));
		$words = array_slice($this->words, $offset, $numDomainWords);
		$words = preg_replace("/[,.:;]/", "", $words);
		$domain = join("", $words);

		// suffix
		$validSuffixes = array("edu", "com", "org", "ca", "net", "co.uk");
		$suffix = $validSuffixes[mt_rand(0, count($validSuffixes)-1)];

		return array(
			"display" => "$prefix@$domain.$suffix"
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255) default NULL",
			"SQLField_Oracle" => "varchar2(255) default NULL",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}
}

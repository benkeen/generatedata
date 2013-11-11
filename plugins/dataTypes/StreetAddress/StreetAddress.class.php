<?php

/**
 * @package DataTypes
 */

class DataType_StreetAddress extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Street Address";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 10;
	private $words;
	private $validStreetTypes;
	private $numValidStreetTypes;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->words = Utils::getLipsum();
			$this->validStreetTypes = explode(",", $this->L["street_types"]);
			$this->numValidStreetTypes = count($this->validStreetTypes);
		}
	}


	public function generate($generator, $generationContextData) {
		$streetName = ucwords(Utils::generateRandomTextStr($this->words, false, "fixed", 1));
		$streetType = $this->validStreetTypes[mt_rand(0, $this->numValidStreetTypes-1)];

		$format = mt_rand(1, 4);
		$streetAddress = "";
		switch($format) {
			case "1":
				$streetAddress = $this->L["po_box"] . " " . mt_rand(100, 999) . ", " . mt_rand(100, 9999) . " $streetName " . $streetType;
				break;
			case "2":
				$streetAddress = mt_rand(100, 999) . "-" . mt_rand(100, 9999) . " $streetName $streetType";
				break;
			case "3":
				$streetAddress = $this->L["ap_num"] . mt_rand(100, 999) . "-" . mt_rand(100, 9999) . " $streetName " . $streetType;
				break;
			case "4":
				$streetAddress = mt_rand(100, 9999) . " $streetName " . $streetType;
				break;
		}

		return array(
			"display" => $streetAddress
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

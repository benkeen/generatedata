<?php


class DataType_StreetAddress extends DataTypePlugin {
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
		$streetType = $this->validStreetTypes[rand(0, $this->numValidStreetTypes-1)];

		$format = rand(1, 4);
		$streetAddress = "";
		switch($format) {
			case "1":
				$streetAddress = $this->L["po_box"] . " " . rand(100, 999) . ", " . rand(100, 9999) . " $streetName " . $streetType;
				break;
			case "2":
				$streetAddress = rand(100, 999) . "-" . rand(100, 9999) . " $streetName $streetType";
				break;
			case "3":
				$streetAddress = $this->L["ap_num"] . rand(100, 999) . "-" . rand(100, 9999) . " $streetName " . $streetType;
				break;
			case "4":
				$streetAddress = rand(100, 9999) . " $streetName " . $streetType;
				break;
		}

		return $streetAddress;
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "varchar(255) default NULL";
				else if ($options == "Oracle")
					$info = "varchar2(255) default NULL";
				break;
		}

		return $info;
	}
}

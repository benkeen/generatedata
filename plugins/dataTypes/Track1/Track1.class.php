<?php


/**
 * @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
 * @package DataTypes
 * @description this class has a hard dependency on the PAN class. That class contains a few public
 *              helper functions.
 */
class DataType_Track1 extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Track 1";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 40;


	private $cardData;

	public function __construct($runtimeContext) {
		for ($i=622126; $i<=622925; $i++){
			$this->prefixList["prefix"][] = $i;
		}
		for ($i=3528; $i<=3589; $i++){
			$this->prefixList["jcb16"][] = $i;
		}
		parent::__construct($runtimeContext);

		if (class_exists("DataType_PAN")) {
			$this->cardData = DataType_PAN::getAllCreditCardData();
		}
	}

	public function generate($generator, $generationContextData) {
		$cardData = $this->cardData[array_rand($this->cardData)];
		$generatedCardNumber = DataType_PAN::generateCreditCardNumber($cardData["prefix"], $cardData["length"]);

		$characters = array("A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z");
		$chars = array();
		while (count($chars) < 4) {
			$char = $characters[mt_rand(0, count($characters)-1)];
			if (!in_array($char, $chars)) {
				$chars[] = $char;
			}
		}
		$randomChars = implode("", $chars);

		$calendar = date("ym", mt_rand());
		$serviceCode = mt_rand(111, 999);
		$num1 = Utils::generateRandomAlphanumericStr(str_repeat("x", 26));

		$track1 = "%B$generatedCardNumber^CardUser/$randomChars^$calendar$serviceCode$num1?";

		return array(
			"display" => $track1
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255)",
			"SQLField_Oracle" => "varchar2(255)",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getHelpHTML() {
		return "<p>{$this->L["track1_help_intro"]}</p>";
	}
}
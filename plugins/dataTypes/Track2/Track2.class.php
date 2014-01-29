<?php


/**
 * @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
 * @package DataTypes
 * @description this class has a hard dependency on the PAN class. That class contains a few public
 *              helper functions.
 */
class DataType_Track2 extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Track 2";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 50;


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

		$calendar = date("ym", mt_rand());
		$serviceCode = mt_rand(111, 999);
		$num = Utils::generateRandomAlphanumericStr(str_repeat("x", 26));

		$track2 = ";$generatedCardNumber=$calendar$serviceCode$num?";

		return array(
			"display" => $track2
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
		return "<p>{$this->L["track2_help_intro"]}</p>";
	}
}
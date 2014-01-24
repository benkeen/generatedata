<?php


/**
 * @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
 * @package DataTypes
 * @description this class has a hard dependency on the PAN class. That class contains a few public
 *              helper functions.
 */
class DataType_Track1 extends DataTypePlugin {
	protected $isEnabled = false;
	protected $dataTypeName = "Track1";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 40;


	// TODO move this to PAN, combine with "format" and "length". Make this the one and only central location for
	// this data.
	private $prefixList = array(
		"visa" => array(
			"prefix"  => array(4539, 4556, 4916, 4532, 4929, 40240071, 4485, 4716, 4),
			"length"  => "",
			"formats" => ""
		),
		"visaElectron"      => array(4026, 417500, 4508, 4844, 4913, 4917),
		"mastercard"        => array(51, 52, 53, 54, 55),
		"amex"              => array(34, 37),
		"discover"          => array(6011, 644, 645, 646, 647, 648, 649, 65),
		"carteBlanche"      => array(300, 301, 302, 303, 304, 305),
		"dinersClubInt"     => array(36),
		"dinersClubEnRoute" => array(2014, 2149),
		"jcb15"             => array(2131, 1800),
		"jcb16"             => array(31, 309),
		"maestro"           => array(5018, 5038, 6304, 6759, 6761, 6762, 6763, 5893, 56, 57, 58),
		"solo"              => array(6334, 6767),
		"switch"            => array(4903, 4905, 4905, 4911, 4936, 564182, 633110, 6333, 6759),
		"laser"             => array(6304, 6706, 6771, 6709)
	);

	public function __construct($runtimeContext) {
		for ($i=622126; $i<=622925; $i++){
			$this->prefixList["prefix"][] = $i;
		}
		for ($i=3528; $i<=3589; $i++){
			$this->prefixList["jcb16"][] = $i;
		}
		parent::__construct($runtimeContext);
	}


	public function generate($generator, $generationContextData) {

		$randomCardType = array_rand($this->prefixList);

		$generatedCardNumber = $this->generateCardNumber($randomCardType);



		$characters = array("A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z");
		$keys = array();

		while (count($keys) < 4) {
			$x = mt_rand(0, count($characters)-1);
			if (!in_array($x, $keys)) {
				$keys[] = $x;
			}
		}

		$random_chars = "";
		foreach ($keys as $key) {
			$random_chars = $random_chars.$characters[$key];
		}

		$random_dt = mt_rand();
		$calendar = date("ym", $random_dt);

		$service_code=rand(111,999);

		$num1 = track1_rand_str();
		$num2 = track1_rand_str();

		$rand_ccnum = array($mastercard[0],$visaelectron[0],$visa13[0],$visa16[0],$americanexpress[0],$discover[0],$dinersclubCB[0],$dinersclubI[0],$dinersclubER[0],$jcb16[0],$jcb15[0],$maestro12[0],$maestro13[0],$maestro14[0],$maestro15[0],$maestro16[0],$maestro17[0],$maestro18[0],$maestro19[0],$solo16[0],$solo18[0],$solo19[0],$switch16[0],$switch18[0],$switch19[0],$laser16[0],$laser17[0],$laser18[0],$laser19[0]);

		$get_rand_ccnum = array_rand($rand_ccnum);

		$track1 = "%B$rand_ccnum[$get_rand_ccnum]^CardUser/$random_chars^$calendar$service_code$num1?";
		$random_chars =NULL;

		return array(
			"display" => $track1
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(30)",
			"SQLField_Oracle" => "varchar2(30)",
			"SQLField_MSSQL" => "VARCHAR(30) NULL"
		);
	}

	public function getHelpHTML() {
		return "<p>{$this->L["track1_help_intro"]}</p>";
	}

	// to create 26 random numbers
	public function track1_rand_str($length = 26, $chars = '1234567890') {
		$chars_length = (strlen($chars) - 1);
		$string = $chars{rand(0, $chars_length)};

		for ($ii = 1; $ii < $length; $ii = strlen($string)) {
			$r = $chars{rand(0, $chars_length)};
			if ($r != $string{$ii - 1}) $string .=  $r;
		}
		return $string;
	}

	public function track1_completed_number($prefix, $length) {
		$ccnumber = $prefix;

		// generate digits
		while ( strlen($ccnumber) < ($length - 1) ) {
			$ccnumber .= rand(0,9);
		}

		// calculate sum
		$sum = 0;
		$pos = 0;

		$reversedCCnumber = strrev( $ccnumber );

		while ( $pos < $length - 1 ) {
			$odd = $reversedCCnumber[ $pos ] * 2;
			if ( $odd > 9 ) {
				$odd -= 9;
			}

			$sum += $odd;
			if ( $pos != ($length - 2) ) {
				$sum += $reversedCCnumber[ $pos +1 ];
			}
			$pos += 2;
		}

		// calculate check digit
		$checkdigit = (( floor($sum/10) + 1) * 10 - $sum) % 10;
		$ccnumber .= $checkdigit;

		return $ccnumber;
	}

	public function generateCardNumber($prefixList, $length, $howMany) {

//		$mastercard = track1_credit_card_number($mastercardPrefixList, 16, 1);
//
//		$visaelectron = track1_credit_card_number($visaPrefixList, 16, 1);
//
//		$visa13 = track1_credit_card_number($visaPrefixList, 13, 1);
//		$visa16 = track1_credit_card_number($visaPrefixList, 16, 1);
//
//		$americanexpress = track1_credit_card_number($americanexpressPrefixList, 15, 1);
//
//		$discover = track1_credit_card_number($discoverPrefixList, 16, 1);
//
//		$dinersclubCB = track1_credit_card_number($dinersclubCBPrefixList, 14, 1);
//
//		$dinersclubI = track1_credit_card_number($dinersclubIPrefixList, 14, 1);
//
//		$dinersclubER = track1_credit_card_number($dinersclubERPrefixList, 15, 1);
//
//		$jcb16 = track1_credit_card_number($jcb16PrefixList, 16, 1);
//		$jcb15 = track1_credit_card_number($jcb15PrefixList, 15, 1);
//
//		$maestro12 = track1_credit_card_number($maestroPrefixList, 12, 1);
//		$maestro13 = track1_credit_card_number($maestroPrefixList, 13, 1);
//		$maestro14 = track1_credit_card_number($maestroPrefixList, 14, 1);
//		$maestro15 = track1_credit_card_number($maestroPrefixList, 15, 1);
//		$maestro16 = track1_credit_card_number($maestroPrefixList, 16, 1);
//		$maestro17 = track1_credit_card_number($maestroPrefixList, 17, 1);
//		$maestro18 = track1_credit_card_number($maestroPrefixList, 18, 1);
//		$maestro19 = track1_credit_card_number($maestroPrefixList, 19, 1);
//
//		$solo16 = track1_credit_card_number($soloPrefixList, 16, 1);
//		$solo18 = track1_credit_card_number($soloPrefixList, 18, 1);
//		$solo19 = track1_credit_card_number($soloPrefixList, 19, 1);
//
//		$switch16 = track1_credit_card_number($switchPrefixList, 16, 1);
//		$switch18 = track1_credit_card_number($switchPrefixList, 18, 1);
//		$switch19 = track1_credit_card_number($switchPrefixList, 19, 1);
//
//		$laser16 = track1_credit_card_number($laserPrefixList, 16, 1);
//		$laser17 = track1_credit_card_number($laserPrefixList, 17, 1);
//		$laser18 = track1_credit_card_number($laserPrefixList, 18, 1);
//		$laser19 = track1_credit_card_number($laserPrefixList, 19, 1);
//
		$ccnumber = $prefixList[ array_rand($prefixList) ];
		$result[] = pan_completed_number($ccnumber, $length);

		return $result;
	}
}
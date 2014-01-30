<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
 * @package DataTypes
 */
class DataType_PAN extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "PAN";
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("PAN.js");


	private static $creditCardData = array(
		"visa" => array(
			"prefix"  => array(4539, 4556, 4916, 4532, 4929, 40240071, 4485, 4716, 4),
			"length"  => "13,16",
			"formats" => array(
				"XXXXXXXXXXXXX",
				"XXXX XXX XX XXXX",
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX"
			)
		),
		"visaElectron" => array(
			"prefix" => array(4026, 417500, 4508, 4844, 4913, 4917),
			"length" => "16",
			"formats" => array(
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX"
			)
		),
		"mastercard" => array(
			"prefix" => array(51, 52, 53, 54, 55),
			"length" => "16",
			"formats" => array(
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX"
			)
		),
		"amex" => array(
			"prefix" => array(34, 37),
			"length" => "15",
			"formats" => array(
				"XXXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXXX"
			)
		),
		"discover" => array(
			"prefix" => array(6011, 644, 645, 646, 647, 648, 649, 65),
			"length" => "16",
			"formats" => array(
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX"
			)
		),
		"carteBlanche" => array(
			"prefix" => array(300, 301, 302, 303, 304, 305),
			"length" => "14",
			"formats" => array(
				"XXXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXXX"
			)
		),
		"dinersClubInt" => array(
			"prefix" => array(36),
			"length" => "14",
			"formats" => array(
				"XXXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXXX"
			)
		),
		"dinersClubEnRoute" => array(
			"prefix" => array(2014, 2149),
			"length" => "15",
			"formats" => array(
				"XXXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXXX"
			)
		),
		"jcb15" => array(
			"prefix" => array(2131, 1800),
			"length" => "15,16",
			"formats" => array(
				"XXXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXXX",
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX"
			)
		),
		"jcb16" => array(
			"prefix" => array(31, 309),
			"length" => "15,16",
			"formats" => array(
				"XXXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXXX",
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX"
			)
		),
		"maestro" => array(
			"prefix" => array(5018, 5038, 6304, 6759, 6761, 6762, 6763, 5893, 56, 57, 58),
			"length" => "12-19",
			"formats" => array(
				"XXXXXXXXXXXX",
				"XXXXXXXXXXXXX",
				"XXXX XXX XX XXXX",
				"XXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXX",
				"XXXXXXXXXXXXXXX",
				"XXXX XXXXXX XXXXX",
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX",
				"XXXXXXXXXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXXX",
				"XXXXXX XX XXXX XXXX XXX"
			)
		),
		"solo" => array(
			"prefix" => array(6334, 6767),
			"length" => "16,18,19",
			"formats" => array(
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXXX",
				"XXXXXX XX XXXX XXXX XXX"
			)
		),
		"switch" => array(
			"prefix" => array(4903, 4905, 4905, 4911, 4936, 564182, 633110, 6333, 6759),
			"length" => "16,18,19",
			"formats" => array(
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXXX",
				"XXXXXX XX XXXX XXXX XXX"
			)
		),
		"laser" => array(
			"prefix" => array(6304, 6706, 6771, 6709),
			"length" => "16-19",
			"formats" => array(
				"XXXXXXXXXXXXXXXX",
				"XXXX XXXX XXXX XXXX",
				"XXXXXX XXXXXX XXXX",
				"XXX XXXXX XXXXX XXX",
				"XXXXXX XXXXXXXXXX",
				"XXXXXXXXXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXX",
				"XXXXXXXXXXXXXXXXXXX",
				"XXXXXX XX XXXX XXXX XXX"
			)
		)
	);


	public function __construct($runtimeContext) {
		for ($i=622126; $i<=622925; $i++) {
			$this->creditCardData["discover"][] = $i;
		}
		for ($i=3528; $i<=3589; $i++) {
			$this->creditCardData["jcb16"][] = $i;
		}
		parent::__construct($runtimeContext);
	}


	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];

		if ($options["cc_brand"] == "rand_card") {
			$options = $this->setRandomCardInfo($options);
		}

		$ccLength    = self::getRandomPANLength($options["cc_length"]);
		$ccFormat    = self::getRandomPANFormat($options["cc_format"], $options["cc_length"]);
		$ccSeparator = self::getRandomPANSeparator($options["cc_separator"], $options["cc_format"]);

		$ccData = self::getCreditCardData($options["cc_brand"]);
		$card = self::generateCreditCardNumber($ccData["prefix"], $ccLength);
		$cardNumber = $this->convertFormat($ccLength, $ccFormat, $ccSeparator, $card);

		if (empty($cardNumber)) {
			$cardNumber = "$ccLength, $ccFormat, {$options["cc_brand"]}, {$options["cc_format"]}";
		}
		return array(
			"display" => $cardNumber
		);
	}


	public function setRandomCardInfo($options) {
		$selectedCard = $options["cc_random_card"][array_rand($options["cc_random_card"])];

		if ($selectedCard == "jcb") {
			$jcbCards = array("jcb15", "jcb16");
			$selectedCard = $jcbCards[mt_rand(0, 1)];
		}

		$cardData = self::getCreditCardData($selectedCard);
		$options["cc_format"] = $cardData["formats"][array_rand($cardData["formats"])];
		$options["cc_length"] = self::getRandomPANLength($cardData["length"]);

		return $options;
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		return array(
			"cc_brand"	     => $postdata["dtExample_$colNum"],
			"cc_separator"   => $postdata["dtOptionPAN_sep_$colNum"],
			"cc_format"      => $postdata["dtOption_$colNum"],
			"cc_length"      => $postdata["dtOptionPAN_digit_$colNum"],
			"cc_random_card" => $postdata["dtOptionPAN_randomCardFormat_$colNum"]
		);
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="mastercard">{$this->L["mastercard"]}</option>
		<option value="visa">{$this->L["visa"]}</option>
		<option value="visaElectron">{$this->L["visa_electron"]}</option>
		<option value="amex">{$this->L["americanexpress"]}</option>
		<option value="discover">{$this->L["discover"]}</option>
		<option value="carteBlanche">{$this->L["carte_blanche"]}</option>
		<option value="dinersClubInt">{$this->L["diners_club_international"]}</option>
		<option value="dinersClubEnRoute">{$this->L["enRoute"]}</option>
		<option value="jcb">{$this->L["jcb"]}</option>
		<option value="maestro">{$this->L["maestro"]}</option>
		<option value="solo">{$this->L["solo"]}</option>
		<option value="switch">{$this->L["switch"]}</option>
		<option value="laser">{$this->L["laser"]}</option>
		<option value="rand_card">{$this->L["rand_card"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html =<<< END
<span id="dtOptionPAN_cardDigitSection_%ROW%">
	{$this->L["length"]}
	<input type="text" name="dtOptionPAN_digit_%ROW%" id="dtOptionPAN_digit_%ROW%" style="width: 60px" readonly="readonly" />
</span>

<span id="dtOptionPAN_cardSeparator_%ROW%">
	{$this->L["separators"]}
	<input type="text" name="dtOptionPAN_sep_%ROW%" id="dtOptionPAN_sep_%ROW%" style="width: 78px" value=" " title="{$this->L["separator_help"]}" />
</span>

<span id="dtOptionPAN_cardFormat_%ROW%">
	{$this->L["ccformats"]}
	<textarea name="dtOption_%ROW%" id="dtOption_%ROW%" title="{$this->L["format_title"]}" style="height: 100px; width: 260px"></textarea>
</span>

<span id="dtOptionPAN_randomCardFormatSection_%ROW%" style="display:none;">
	{$this->L["ccrandom"]}
	<select multiple="multiple" name="dtOptionPAN_randomCardFormat_%ROW%[]" id="dtOptionPAN_randomCardFormat_%ROW%" title="{$this->L["rand_brand_title"]}" style="height: 100px; width: 260px">
		<option value="mastercard">{$this->L["mastercard"]}</option>
		<option value="visa">{$this->L["visa"]}</option>
		<option value="visaElectron">{$this->L["visa_electron"]}</option>
		<option value="amex">{$this->L["americanexpress"]}</option>
		<option value="discover">{$this->L["discover"]}</option>
		<option value="carteBlanche">{$this->L["carte_blanche"]}</option>
		<option value="dinersClubInt">{$this->L["diners_club_international"]}</option>
		<option value="dinersClubEnRoute">{$this->L["enRoute"]}</option>
		<option value="jcb">{$this->L["jcb"]}</option>
		<option value="maestro">{$this->L["maestro"]}</option>
		<option value="solo">{$this->L["solo"]}</option>
		<option value="switch">{$this->L["switch"]}</option>
		<option value="laser">{$this->L["laser"]}</option>
	</select>
</span>
END;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255)",
			"SQLField_Oracle" => "varchar2(255)",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getHelpHTML() {
		$html =<<<EOF
<p>
	{$this->L["pan_help_intro"]}
	<b>{$this->L["mastercard"]}</b>, <b>{$this->L["visa"]}</b>, <b>{$this->L["visa_electron"]}</b>,
	<b>{$this->L["americanexpress"]}</b>, <b>{$this->L["discover"]}</b>, <b>{$this->L["american_diners"]}</b>,
	<b>{$this->L["carte_blanche"]}</b>, <b>{$this->L["diners_club_international"]}</b>, <b>{$this->L["enroute"]}</b>,
	<b>{$this->L["jcb"]}</b>, <b>{$this->L["maestro"]}</b>, <b>{$this->L["solo"]}</b>,
	<b>{$this->L["switch"]}</b>, <b>{$this->L["laser"]}</b>.
</p>
EOF;

		return $html;
	}


	/**
	 * @param $ccLength
	 * @param $ccFormat
	 * @param $ccSeparator
	 * @param $ccNumber
	 * @return array|bool|string
	 */
	private static function convertFormat($ccLength, $ccFormat, $ccSeparator, $ccNumber) {

		// TODO pity we need this extra test on each call
		if ($ccLength == strlen($ccNumber)) {
			$a = self::convertXtoNumber($ccFormat, $ccNumber);

			if ($a == $ccNumber) {
				return $a;
			} else {
				return implode($ccSeparator, $a);
			}
		} else {
			return false;
		}
	}

	/**
	 * Convert X's to the specified number
	 */
	private static function convertXtoNumber($chosen_format, $ccnumber){
		$positions = array();
		$pos = -1;
		while (($pos = strpos($chosen_format, " ", $pos+1)) !== false) {
			$positions[] = $pos;
		}

		if (empty($positions)) {
			return $ccnumber;
		}

		$result   = array();
		$result_f = array();
		$j = 1;

		for ($i=0; $i<count($positions); $i++) {
			$result[$i] = substr($ccnumber, 0, $positions[$i]-$i);
		}

		$result_f[0] = ($result[0]);
		for ($i=0; $i<count($positions)-1; $i++) {
			$result_f[$j] = substr($result[$j], $positions[$i]-$i);
			$j++;
		}
		$result_f[count($positions)] = substr($ccnumber, ($positions[count($positions)-1])-(count($positions)-1));

		return $result_f;
	}


	private static function getRandomPANFormat($userSelectedFormats, $randCardLength) {

		// if no format is selected then by default continuous number of that length will be displayed
		if ($userSelectedFormats == "") {
			return str_repeat("X", $randCardLength);
		}

		$formats = explode("\n", $userSelectedFormats);

		$sortedFormat = array();
		$not_i = 0;

		for ($fc = 0; $fc < count($formats); $fc++){
			$count_X = "0"; // get count of X's to match with the card length

			for ($i=0; $i<strlen($formats[$fc]); $i++) {
				if (substr($formats[$fc], $i, 1) == "X") {
					$count_X++;
				}
			}

			if ($count_X == $randCardLength) {
				$sortedFormat[$not_i] = $formats[$fc];
				$not_i++;
			}
		}

		$chosenFormat = "";
		if (count($sortedFormat) >= 1) {
			$chosenFormat = $sortedFormat[mt_rand(0, count($sortedFormat)-1)];
		}

		return trim($chosenFormat);
	}


	// will give a random separator
	private static function getRandomPANSeparator($separators, $randCardFormat) {

		$chosenSep = "";
		if (preg_match("/[^X]/", $randCardFormat)) {

			$separatorList = explode("|", $separators);
			$chosenSep = $separatorList[rand(0, count($separatorList)-1)];

			// if no separator was entered
			if ($separators == "") {
				$chosenSep = " ";
			}
		}

		return $chosenSep;
	}


	private static function getRandomPANLength($userSelectedLength) {

		// this would be better
//		$groups = explode(",", $userSelectedLength);
//		for ($i=0; $i<count($groups); $i++) {
//			$groups = explode(",", $groups[$i]);
//		}

		// if there's more than 1 card length then pick a random one
		if ($userSelectedLength == "12-19") {
			$userSelectedLength = "12,13,14,15,16,17,18,19";
		} else if ($userSelectedLength == "16-19") {
			$userSelectedLength = "16,17,18,19";
		}

		$lengths = explode(",", $userSelectedLength);
		$chosenLength = 0;
		if (count($lengths) >= 1) {
			$chosenLength = $lengths[mt_rand(0, count($lengths)-1)];
		}

		return $chosenLength;
	}

	// --------------------------------------------------------------------------------------------
	// Public functions

	public static function generateCreditCardNumber($prefixList, $length) {
		$ccNumber = $prefixList[array_rand($prefixList)];

		// generate digits
		while (strlen($ccNumber)<($length-1)) {
			$ccNumber .= mt_rand(0,9);
		}

		// calculate sum
		$sum = 0;
		$pos = 0;

		$reversedCCnumber = strrev($ccNumber);
		while ($pos < $length - 1) {
			$odd = $reversedCCnumber[$pos]*2;
			if ($odd > 9) {
				$odd -= 9;
			}
			$sum += $odd;

			if ($pos != ($length - 2)) {
				$sum += $reversedCCnumber[ $pos +1 ];
			}
			$pos += 2;
		}

		// calculate check digit
		$checkDigit = ((floor($sum/10) + 1) * 10 - $sum) % 10;
		$ccNumber .= $checkDigit;

		return $ccNumber;
	}


	public static function getCreditCardData($ccBrand) {
		$data = array();
		reset(self::$creditCardData);
		while (list($currBrand, $ccData) = each(self::$creditCardData)) {
			if ($ccBrand != $currBrand) {
				continue;
			}
			$data = $ccData;
		}
		return $data;
	}

	public static function getAllCreditCardData() {
		return self::$creditCardData;
	}
}
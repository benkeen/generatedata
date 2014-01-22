<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_PAN extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "PAN";
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("PAN.js");


	public function __construct($runtimeContext) {
		for ($dpl=622126; $dpl<=622925; $dpl++) {
			$this->discoverPrefixList[] = $dpl;
		}

		for ($jpl=3528; $jpl<=3589; $jpl++) {
			$this->jcb16PrefixList[] = $jpl;
		}
		parent::__construct($runtimeContext);
	}


	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];

		/*
			$rand_card_brand = array_rand($str["cc_random_card"]);
			$str["cc_random_card"] = $str["cc_random_card"][$rand_card_brand];

			// TODO
			if ($str["cc_random_card"] == "mastercard" || $str["cc_random_card"] == "discover" || $str["cc_random_card"] == "visa_electron")  {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "16";
				$str["cc_format"] = "XXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX";
			} else if($str["cc_random_card"] == "visa") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "13,16";
				$str["cc_format"] = "XXXXXXXXXXXXX\nXXXX XXX XX XXXX\nXXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX";
			} else if($str["cc_random_card"] == "amex" || $str["cc_random_card"] == "enroute") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "15";
				$str["cc_format"] = "XXXXXXXXXXXXXXX\nXXXX XXXXXX XXXXX";
			} else if($str["cc_random_card"] == "carte_blanche" || $str["cc_random_card"] == "diners_club_international") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "14";
				$str["cc_format"] = "XXXXXXXXXXXXXX\nXXXX XXXXXX XXXX";
			} else if($str["cc_random_card"] == "jcb") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "15,16";
				$str["cc_format"] = "XXXXXXXXXXXXXXX\nXXXX XXXXXX XXXXX\nXXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX";
			} else if($str["cc_random_card"] == "maestro") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "12-19";
				$str["cc_format"] = "XXXXXXXXXXXX\nXXXXXXXXXXXXX\nXXXX XXX XX XXXX\nXXXXXXXXXXXXXX\nXXXX XXXXXX XXXX\nXXXXXXXXXXXXXXX\nXXXX XXXXXX XXXXX\nXXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX\nXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXX\nXXXXXX XX XXXX XXXX XXX";
			} else if($str["cc_random_card"] == "solo" || $str["cc_random_card"] == "switch") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "16,18,19";
				$str["cc_format"] = "XXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXX\nXXXXXX XX XXXX XXXX XXX";
			} else if ($str["cc_random_card"] == "laser") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "16-19";
				$str["cc_format"] = "XXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX\nXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXX\nXXXXXX XX XXXX XXXX XXX";
			}
		}
*/

		$ccLength    = self::getRandomPANLength($options["cc_length"]);
		$ccFormat    = self::getRandomPANFormat($options["cc_format"], $options["cc_length"]);
		$ccSeparator = self::getRandomPANSeparator($options["cc_separator"], $options["cc_format"]);


		$prefixList = array();
		switch ($options["cc_brand"]) {
			case "mastercard":
				$prefixList = array("51", "52", "53", "54", "55");
				break;
			case "visa":
				$prefixList = array("4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4");
				break;
			case "visa_electron":
				$prefixList = array("4026", "417500", "4508", "4844", "4913", "4917");
				break;
			case "amex":
				$prefixList = array("34", "37");
				break;
			case "discover":
				$prefixList = array("6011", "644", "645", "646", "647", "648", "649", "65");
				break;
			case "carte_blanche":
				$prefixList = array("300", "301", "302", "303", "304", "305");
				break;
			case "diners_club_international":
				$prefixList = array("36");
				break;
			case "enroute":
				$prefixList = array("2014", "2149");
				break;
			case "jcb":
				if ($ccLength == 15) {
					$prefixList = array("31", "309");
				} else {
					$prefixList = array("2131", "1800");
				}
				break;
			case "maestro":
				$prefixList = array("5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "5893", "58", "56", "57");
				break;
			case "solo":
				$prefixList = array("6334", "6767");
				break;
			case "switch":
				$prefixList = array("4903", "4905", "4911", "4936", "564182", "633110", "6333", "6759");
				break;
			case "laser":
				$prefixList = array("6304", "6706", "6771", "6709");
				break;
		}

		$card = self::getCreditCardNumber($prefixList, $ccLength);
		$cardNumber = $this->pan_convert_format($ccLength, $ccFormat, $ccSeparator, $card[0]);


		if ($cardNumber == "" || $cardNumber == false) {
			echo "not generated</br>";
		} else {
			return $cardNumber;
		}
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
//		if (empty($postdata["dtOption_$colNum"])) {
//			return false;
//		}

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
		<option value="visa_electron">{$this->L["visa_electron"]}</option>
		<option value="amex">{$this->L["americanexpress"]}</option>
		<option value="discover">{$this->L["discover"]}</option>
		<option value="carte_blanche">{$this->L["carte_blanche"]}</option>
		<option value="diners_club_international">{$this->L["diners_club_international"]}</option>
		<option value="enroute">{$this->L["enroute"]}</option>
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
	{$this->L["digits"]}
	<input type="text" name="dtOptionPAN_digit_%ROW%" id="dtOptionPAN_digit_%ROW%" style="width: 60px" readonly="readonly" />
</span>

<span id="dtOptionPAN_cardSeparator_%ROW%">
	{$this->L["separators"]}
	<input type="text" name="dtOptionPAN_sep_%ROW%" id="dtOptionPAN_sep_%ROW%" style="width: 78px" value=" |:|*|.|-" />
</span>

<span id="dtOptionPAN_cardFormat_%ROW%">
	{$this->L["ccformats"]}
	<textarea name="dtOption_%ROW%" id="dtOption_%ROW%" title="{$this->L["format_title"]}" style="height: 100px; width: 260px"></textarea>
</span>

<span id="dtOptionPAN_randomCardFormatSection_%ROW%" style="display:none;">
	{$this->L["ccrandom"]}
	<select multiple="multiple" name="dtOption_randomCardFormat_\$ROW\$[]" id="dtOption_randomCardFormat__\$ROW\$" title="{$this->L["rand_brand_title"]}" style="height: 100px; width: 260px">
		<option value="mastercard">{$this->L["mastercard"]}</option>
		<option value="visa">{$this->L["visa"]}</option>
		<option value="visa_electron">{$this->L["visa_electron"]}</option>
		<option value="amex">{$this->L["americanexpress"]}</option>
		<option value="discover">{$this->L["discover"]}</option>
		<option value="carte_blanche">{$this->L["carte_blanche"]}</option>
		<option value="diners_club_international">{$this->L["diners_club_international"]}</option>
		<option value="enroute">{$this->L["enroute"]}</option>
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

	public function getHelpHTML() {
		$html =<<<EOF
<p>
	{$this->L["pan_help_intro"]}
</p>

<table cellpadding="0" cellspacing="1">
<tr>
	<td>{$this->L["mastercard"]}</td>
	<td>{$this->L["visa13"]}</td>
</tr>
<tr>
	<td>{$this->L["visa16"]}</td>
	<td>{$this->L["americanexpress"]}</td>
</tr>
<tr>
	<td>{$this->L["discover"]}</td>
	<td>{$this->L["american_diners"]}</td>
</tr>
<tr>
	<td>{$this->L["carte_blanche"]}</td>
	<td>{$this->L["diners_club_international"]}</td>
</tr>
<tr>
	<td>{$this->L["enroute"]}</td>
	<td>{$this->L["jcb15"]}</td>
</tr>
<tr>
	<td>{$this->L["jcb16"]}</td>
	<td>{$this->L["maestro"]}</td>
</tr>
<tr>
	<td>{$this->L["solo"]}</td>
	<td></td>
</tr>
</table>
EOF;

		return $html;
	}


	private static function pan_completed_number($prefix, $length) {
		$ccnumber = $prefix;

		// generate digits
		while (strlen($ccnumber)<($length-1)) {
			$ccnumber .= mt_rand(0,9);
		}

		// Calculate sum
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


	private static function getCreditCardNumber($prefixList, $length) {
		$ccNumber = $prefixList[array_rand($prefixList)];
		return self::pan_completed_number($ccNumber, $length);
	}


	/**
	 * @param $ccLength
	 * @param $ccFormat
	 * @param $ccSeparator
	 * @param $ccNumber
	 * @return array|bool|string
	 */
	private static function pan_convert_format($ccLength, $ccFormat, $ccSeparator, $ccNumber) {
		if ($ccLength == strlen($ccNumber)) {
			$a = self::convertXtoNumber($ccFormat, $ccNumber);
			if ($a == $ccNumber) {
				return ($a); // TODO interesting...
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
	private static function getRandomPANSeparator($user_sel_seperator, $rand_card_format) {

		// if card number is continuous then there should be no separator

		if ($rand_card_format == "XXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXXXXX"){
			$chosen_sep = "";
		} else{

			//----------------From all user input separators pick a random one--------------------
			$get_sep = explode("|", $user_sel_seperator);
			if (count($get_sep) >= 1)
				$chosen_sep = $get_sep[rand(0, count($get_sep)-1)];

			// on selection, convert it
			if ($chosen_sep == "C") {
				$chosen_sep = ":";
			} else if($chosen_sep == "A") {
				$chosen_sep = "*";
			} else if($chosen_sep == "P") {
				$chosen_sep = "|";
			} else if($chosen_sep == "D") {
				$chosen_sep = ".";
			} else if($chosen_sep == "H") {
				$chosen_sep = "-";
			} else if($chosen_sep == "S") {
				$chosen_sep = " ";
			} else {
				$chosen_sep = " ";
			}

			//If no seperator is selected then by default space will be displayed.
			if($user_sel_seperator == "") {
				$chosen_sep = " ";
			}

			// If card number is continous then there should be no seperator
			// if($rand_card_format == "XXXXXXXXXXXX"){
			// $chosen_sep = " ";
			// }
		}
		return $chosen_sep;
	}


	private static function getRandomPANLength($userSelectedLength) {

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
}
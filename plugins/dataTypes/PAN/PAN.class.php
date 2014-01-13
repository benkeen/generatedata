<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_PAN extends DataTypePlugin {

	/**#@+
	 * @access protected
	 */
	protected $isEnabled = true;
	protected $dataTypeName = "PAN";
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("PAN.js");


	private $visaPrefixList = array("4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4");
	private $visaelectronPrefixList = array("4026", "417500", "4508", "4844", "4913", "4917");
	private $mastercardPrefixList = array("51", "52", "53", "54", "55");
	private $americanexpressPrefixList = array("34", "37");
	private $discoverPrefixList = array("6011", "644", "645", "646", "647", "648", "649", "65");
	private $dinersclubCBPrefixList = array("300", "301", "302", "303", "304", "305");
	private $dinersclubIPrefixList = array("36");
	private $dinersclubERPrefixList = array("2014", "2149");
	private $jcb16PrefixList = array("31", "309");
	private $jcb15PrefixList = array("2131", "1800");
	private $maestroPrefixList = array("5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "5893", "58", "56", "57");
	private $soloPrefixList = array("6334", "6767");
	private $switchPrefixList = array("4903", "4905", "4911", "4936", "564182", "633110", "6333", "6759");
	private $laserPrefixList = array("6304", "6706", "6771", "6709");

//for ($dpl=622126; $dpl <= 622925; $dpl++){
//	$discoverPrefixList[] = $dpl;
//}

//JCB
//for($jpl=3528; $jpl <= 3589; $jpl++){
//	$jcb16PrefixList[] = $jpl;
//}


	public function generate($generator, $generationContextData) {


		//For random card brand give card length and card format for $str array to proceed further
		If($str["cc_brand"] == "rand_card"){
			$rand_card_brand = array_rand($str["cc_random_card"]);
			$str["cc_random_card"] = $str["cc_random_card"][$rand_card_brand];

			if ($str["cc_random_card"] == "mastercard" || $str["cc_random_card"] == "discover" || $str["cc_random_card"] == "visa_electron")  {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "16";
				$str["cc_format"] = "XXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX";}

			else if($str["cc_random_card"] == "visa") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "13,16";
				$str["cc_format"] = "XXXXXXXXXXXXX\nXXXX XXX XX XXXX\nXXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX";}

			else if($str["cc_random_card"] == "amex" || $str["cc_random_card"] == "enroute") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "15";
				$str["cc_format"] = "XXXXXXXXXXXXXXX\nXXXX XXXXXX XXXXX";}

			else if($str["cc_random_card"] == "carte_blanche" || $str["cc_random_card"] == "diners_club_international") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "14";
				$str["cc_format"] = "XXXXXXXXXXXXXX\nXXXX XXXXXX XXXX";}

			else if($str["cc_random_card"] == "jcb") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "15,16";
				$str["cc_format"] = "XXXXXXXXXXXXXXX\nXXXX XXXXXX XXXXX\nXXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX";}

			else if($str["cc_random_card"] == "maestro") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "12-19";
				$str["cc_format"] = "XXXXXXXXXXXX\nXXXXXXXXXXXXX\nXXXX XXX XX XXXX\nXXXXXXXXXXXXXX\nXXXX XXXXXX XXXX\nXXXXXXXXXXXXXXX\nXXXX XXXXXX XXXXX\nXXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX\nXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXX\nXXXXXX XX XXXX XXXX XXX";}

			else if($str["cc_random_card"] == "solo" || $str["cc_random_card"] == "switch") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "16,18,19";
				$str["cc_format"] = "XXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXX\nXXXXXX XX XXXX XXXX XXX";}

			else if ($str["cc_random_card"] == "laser") {
				$str["cc_brand"] = $str["cc_random_card"];
				$str["cc_length"] = "16-19";
				$str["cc_format"] = "XXXXXXXXXXXXXXXX\nXXXX XXXX XXXX XXXX\nXXXXXX XXXXXX XXXX\nXXX XXXXX XXXXX XXX\nXXXXXX XXXXXXXXXX\nXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXX\nXXXXXX XX XXXX XXXX XXX";}

		}

		global $mastercardPrefixList, $visaPrefixList, $visaelectronPrefixList, $americanexpressPrefixList, $discoverPrefixList, $dinersclubADPrefixList, $dinersclubCBPrefixList, $dinersclubIPrefixList, $dinersclubERPrefixList, $dinersclubERPrefixList, $jcb16PrefixList, $jcb15PrefixList, $maestroPrefixList, $soloPrefixList, $switchPrefixList, $laserPrefixList;

		//add random length to array
		$str["cc_length"] = pan_random_length($str["cc_length"]);
		//add random format to array
		$str["cc_format"] = pan_random_format($str["cc_format"], $str["cc_length"]);
		//add random seperator to array
		$str["cc_seperator"] = pan_random_seperator($str["cc_seperator"], $str["cc_format"]);


		// echo "<pre>";
		// print_r ($str);
		// echo "</pre>";
		if($str['cc_brand'] == "mastercard"){
			$mastercard = pan_credit_card_number($mastercardPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $mastercard[0]);
		}
		else if($str['cc_brand'] == "visa"){
			$visa = pan_credit_card_number($visaPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $visa[0]);
		}
		else if($str['cc_brand'] == "visa_electron"){
			$visaelectron = pan_credit_card_number($visaelectronPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $visaelectron[0]);
		}
		else if($str['cc_brand'] == "amex"){
			$americanexpress = pan_credit_card_number($americanexpressPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $americanexpress[0]);
		}
		else if($str['cc_brand'] == "discover"){
			$discover = pan_credit_card_number($discoverPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $discover[0]);
		}
		// else if($str['cc_brand'] == "american_diners"){
		// $dinersclubAD = pan_credit_card_number($dinersclubADPrefixList, $str["cc_length"], 1);
		// $final_string = pan_convert_format($str, $dinersclubAD[0]);
		// }
		else if($str['cc_brand'] == "carte_blanche"){
			$dinersclubCB = pan_credit_card_number($dinersclubCBPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $dinersclubCB[0]);
		}
		else if($str['cc_brand'] == "diners_club_international"){
			$dinersclubI = pan_credit_card_number($dinersclubIPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $dinersclubI[0]);
		}
		else if($str['cc_brand'] == "enroute"){
			$dinersclubER = pan_credit_card_number($dinersclubERPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $dinersclubER[0]);
		}
		else if($str['cc_brand'] == "jcb"){
			$jcbPrefixLists = "jcb". $str["cc_length"] ."PrefixList";
			$jcb = pan_credit_card_number($$jcbPrefixLists, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $jcb[0]);
		}
		else if($str['cc_brand'] == "maestro"){
			$maestro = pan_credit_card_number($maestroPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $maestro[0]);
		}
		else if($str['cc_brand'] == "solo"){
			$solo = pan_credit_card_number($soloPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $solo[0]);
		}
		else if($str['cc_brand'] == "switch"){
			$switch = pan_credit_card_number($switchPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $switch[0]);
		}
		else if($str['cc_brand'] == "laser"){
			$laser = pan_credit_card_number($laserPrefixList, $str["cc_length"], 1);
			$final_string = pan_convert_format($str, $laser[0]);
		}

		if($final_string == "" || $final_string == false){
			echo "not generated</br>";
		}
		else{
			return $final_string;
		}

	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if (empty($postdata["dt_$colNum"])) {
			return false;
		}

		return array(
			"cc_brand"	     => $postdata["dt_$colNum"],
			"cc_seperator"   => $postdata["sep_$colNum"],
			"cc_format"      => $postdata["option_$colNum"],
			"cc_length"      => $postdata["digit_$colNum"],
			"cc_random_card" => $postdata["option_mselect_$colNum"]
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
<div id="Card_digit_\$ROW\$" style="display:inline;">
	{$this->L["digits"]}
	<input type="text" name="digit_\$ROW\$" id="digit_\$ROW\$" style="width: 60px" readonly="readonly"/>
</div>

<div id="Card_seperator_\$ROW\$" style="display:inline;">
	{$this->L["seperators"]}
	<input type="text" name="sep_\$ROW\$" id="sep_\$ROW\$" style="width: 78px" value="C|A|P|D|H|S" title="C : Colon (:)\nA : Asterik (*)\nP : Pipe (|)\nD : Dot (.)\nH : Hyphen (-)\nS : Space ( )"/>
</div>

<div id="Card_format_\$ROW\$">
	{$this->L["ccformats"]}
	<textarea name="option_\$ROW\$" id="option_\$ROW\$" title="{$this->L["format_title"]}" style="height: 100px; width: 260px"></textarea>
</div>

<div id="Card_rand_select_\$ROW\$" style="display:none;">
	{$this->L["ccrandom"]}
	<select multiple="multiple" name="option_mselect_\$ROW\$[]" id="option_mselect_\$ROW\$" title="{$this->L["rand_brand_title"]}" style="height: 100px; width: 260px">
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
</div>
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

	private function pan_completed_number($prefix, $length) {
		$ccnumber = $prefix;

		# generate digits
		while ( strlen($ccnumber) < ($length - 1) ) {
			$ccnumber .= rand(0,9);
		}

		# Calculate sum
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

		# Calculate check digit
		$checkdigit = (( floor($sum/10) + 1) * 10 - $sum) % 10;
		$ccnumber .= $checkdigit;

		return $ccnumber;
	}

	private function pan_credit_card_number($prefixList, $length, $howMany) {
		for ($i = 0; $i < $howMany; $i++) {
			$ccnumber = $prefixList[ array_rand($prefixList) ];
			$result[] = pan_completed_number($ccnumber, $length);
		}
		return $result;
	}


	private function pan_convert_format($all_options, $ccnumber){

		// get user specified formats that too depend on the card length
		if ($all_options["cc_length"] == strlen($ccnumber)){
			$a = pan_convertXtoN($all_options["cc_format"], $ccnumber);
			If($a == $ccnumber){
				return ($a);
			}
			Else{
				return implode($all_options["cc_seperator"],$a);
			}
		}
		Else{return false;}

	}

//Will convert all X's to the specified number
	private function pan_convertXtoN($chosen_format, $ccnumber){

		$positions = array();
		$result =  array();
		$pos = -1;
		while (($pos = strpos($chosen_format, " ", $pos+1)) !== false) {
			$positions[] = $pos;
		}

		if(empty($positions)){
			return $ccnumber;
		}

		$result =  array();
		$result_f =  array();
		$j = 1;
		for($i = 0 ;$i < count($positions) ; $i++)
		{
			$result[$i] = substr($ccnumber,0,$positions[$i]-$i);
		}

		$result_f[0] = ($result[0]);
		for($i = 0 ;$i < count($positions)-1 ; $i++)
		{
			$result_f[$j] = substr($result[$j],$positions[$i]-$i);
			$j++;
		}
		$result_f[count($positions)] = substr($ccnumber,($positions[count($positions)-1])-(count($positions)-1));
		return $result_f;
	}

//Will give a random format
	private function pan_random_format($user_sel_format, $rand_card_length){

		//If no format is selected then by default continous number of that length will be displayed.
		if($user_sel_format == ""){
			return str_repeat("X", $rand_card_length);
		}

		//----------------From all user input formats pick a random one--------------------
		$get_format = explode("\n", $user_sel_format);
		$sorted_format = array();
		$not_i = 0;//zero
		for ($fc = 0; $fc < count($get_format); $fc++){

			//Get count of X's to match with the card length
			$count_X="0";

			for($i=0; $i<strlen($get_format[$fc]); $i=$i+1){
				if(substr($get_format[$fc],$i,1)=="X"){
					$count_X=$count_X+1;
				}
			}

			if($count_X == $rand_card_length){
				$sorted_format[$not_i] = $get_format[$fc];
				$not_i++;
			}
		}
		if (count($sorted_format) >= 1)
			$chosen_format = $sorted_format[rand(0, count($sorted_format)-1)];
		return Trim($chosen_format);

	}

//Will give a random seperator
	private function pan_random_seperator($user_sel_seperator, $rand_card_format){

		//If card number is continous then there should be no seperator
		if($rand_card_format == "XXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXXXX" || $rand_card_format == "XXXXXXXXXXXXXXXXXXX"){
			$chosen_sep = "";
		}
		else{

			//----------------From all user input seperators pick a random one--------------------
			$get_sep = explode("|", $user_sel_seperator);
			if (count($get_sep) >= 1)
				$chosen_sep = $get_sep[rand(0, count($get_sep)-1)];

			//On selection, convert it
			If($chosen_sep == "C"){
				$chosen_sep = ":";
			}
			Else if($chosen_sep == "A"){
				$chosen_sep = "*";
			}
			Else if($chosen_sep == "P"){
				$chosen_sep = "|";
			}
			Else if($chosen_sep == "D"){
				$chosen_sep = ".";
			}
			Else if($chosen_sep == "H"){
				$chosen_sep = "-";
			}
			Else if($chosen_sep == "S"){
				$chosen_sep = " ";
			}
			Else{
				$chosen_sep = " ";
			}

			//If no seperator is selected then by default space will be displayed.
			if($user_sel_seperator == ""){
				$chosen_sep = " ";
			}

			// If card number is continous then there should be no seperator
			// if($rand_card_format == "XXXXXXXXXXXX"){
			// $chosen_sep = " ";
			// }
		}
		return $chosen_sep;
	}

	// Will give a random card length
	private function pan_random_length($user_sel_length){

		//----------------If there are more than 1 card length then pick a random one--------------------
		if ($user_sel_length == "12-19"){
			$user_sel_length = "12,13,14,15,16,17,18,19";
		} else if($user_sel_length == "16-19"){
			$user_sel_length = "16,17,18,19";
		}

		$get_length = explode(",", $user_sel_length);
		if (count($get_length) >= 1)
			$chosen_length = $get_length[rand(0, count($get_length)-1)];

		return $chosen_length;
	}



}
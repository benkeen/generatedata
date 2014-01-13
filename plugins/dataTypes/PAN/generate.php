<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$pan_process_order = 1;

// global vars. Defining them here ensures they're only called & defined ONCE: when this file is initially
// included by the core script

//Visa
$visaPrefixList[] =  "4539";
$visaPrefixList[] =  "4556";
$visaPrefixList[] =  "4916";
$visaPrefixList[] =  "4532";
$visaPrefixList[] =  "4929";
$visaPrefixList[] =  "40240071";
$visaPrefixList[] =  "4485";
$visaPrefixList[] =  "4716";
$visaPrefixList[] =  "4";

//Visa Electron
$visaelectronPrefixList[] =  "4026";
$visaelectronPrefixList[] =  "417500";
$visaelectronPrefixList[] =  "4508";
$visaelectronPrefixList[] =  "4844";
$visaelectronPrefixList[] =  "4913";
$visaelectronPrefixList[] =  "4917";

//Mastercard
$mastercardPrefixList[] =  "51";
$mastercardPrefixList[] =  "52";
$mastercardPrefixList[] =  "53";
$mastercardPrefixList[] =  "54";
$mastercardPrefixList[] =  "55";

//American Express
$americanexpressPrefixList[] = "34";
$americanexpressPrefixList[] = "37";

//Discover
$discoverPrefixList[] = "6011";
$discoverPrefixList[] = "644";
$discoverPrefixList[] = "645";
$discoverPrefixList[] = "646";
$discoverPrefixList[] = "647";
$discoverPrefixList[] = "648";
$discoverPrefixList[] = "649";
$discoverPrefixList[] = "65";
for($dpl=622126; $dpl <= 622925; $dpl++){
	$discoverPrefixList[] = $dpl;
}

//American Diner's-------------------------
// $dinersclubADPrefixList[] = "30"; 

//Carte Blanche
$dinersclubCBPrefixList[] = "300"; 
$dinersclubCBPrefixList[] = "301";
$dinersclubCBPrefixList[] = "302";
$dinersclubCBPrefixList[] = "303";
$dinersclubCBPrefixList[] = "304";
$dinersclubCBPrefixList[] = "305";

//Diner's Club International
$dinersclubIPrefixList[] = "36"; 

//enRoute
$dinersclubERPrefixList[] = "2014"; 
$dinersclubERPrefixList[] = "2149";

//JCB
for($jpl=3528; $jpl <= 3589; $jpl++){
	$jcb16PrefixList[] = $jpl;
}
$jcb16PrefixList[] = "31";
$jcb16PrefixList[] = "309";

$jcb15PrefixList[] = "2131";
$jcb15PrefixList[] = "1800";

//Maestro
$maestroPrefixList[] = "5018";
$maestroPrefixList[] = "5020";
$maestroPrefixList[] = "5038";
$maestroPrefixList[] = "6304";
$maestroPrefixList[] = "6759";
$maestroPrefixList[] = "6761";
$maestroPrefixList[] = "6762";
$maestroPrefixList[] = "6763";
$maestroPrefixList[] = "5893";
$maestroPrefixList[] = "58";
$maestroPrefixList[] = "56";
$maestroPrefixList[] = "57";

//Solo
$soloPrefixList[] = "6334";
$soloPrefixList[] = "6767";

//Switch
$switchPrefixList[] = "4903";
$switchPrefixList[] = "4905";
$switchPrefixList[] = "4911";
$switchPrefixList[] = "4936";
$switchPrefixList[] = "564182";
$switchPrefixList[] = "633110";
$switchPrefixList[] = "6333";
$switchPrefixList[] = "6759";

//Laser
$laserPrefixList[] = "6304";
$laserPrefixList[] = "6706";
$laserPrefixList[] = "6771";
$laserPrefixList[] = "6709";

/**
 * --- Required function! ---
 *
 * Called by process.php when the user has chosen to generate the data. This determines what options the user
 * selected in the user interface; it's used to figure out what settings to pass to [NAMESPACE]_generate_item(),
 * to provide that function the information needed to generate that particular data item.
 *
 * Note: if this function determines that the values entered by the user in the options column are invalid
 * (most likely just incomplete) the function can explicitly return false to tell the core script to ignore
 * this row.
 *
 * @param array $postdata
 * @param integer the column number (well, *row* in the UI!) of the item
 */

function pan_get_template_options($postdata, $col, $num_cols)
{
// echo "<pre>";
// print_r ($postdata);
// echo "</pre>";
  if (empty($postdata["dt_$col"]))
    return false;
	
  $cc_gen_options = array(
	"cc_brand"	   => $postdata["dt_$col"],
    "cc_seperator" => $postdata["sep_$col"],
    "cc_format"    => $postdata["option_$col"],
	"cc_length"    => $postdata["digit_$col"],
	"cc_random_card" => $postdata["option_mselect_$col"]
      );

  return $cc_gen_options;
} 


/**
 * --- Required function! ---
 *
 * For this data type, row # and metadata aren't needed.
 *
 * @param integer $row the row number in the generated content
 * @param mixed $options whatever options were passed for this function (string in this case)
 * @param array $metadata
 * @return string
 */

function pan_generate_item($row, $str, $existing_row_data){
// echo "<pre>";
// print_r ($str);
// echo "</pre>";


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


/**
 * --- Required function! ---
 *
 * For this data type, row # and metadata aren't needed.
 *
 * @param string $export_type e.g. "sql"
 * @param mixed $options e.g. "mysql" or "oracle"
 * @return string
 */
function pan_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(255) default NULL";
      else if ($options == "Oracle")
        $info = "varchar2(255) default NULL";
  	  break;
  }

  return $info;
}

// ------------------------------------------------------------------------------------------------
/**
 * Custom functions......
 * Generate random Credit card number
 *
 */

function pan_completed_number($prefix, $length) {

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

function pan_credit_card_number($prefixList, $length, $howMany) {

    for ($i = 0; $i < $howMany; $i++) {
        $ccnumber = $prefixList[ array_rand($prefixList) ];
        $result[] = pan_completed_number($ccnumber, $length);
    }
    return $result;
}


function pan_convert_format($all_options, $ccnumber){

		//---------Get user specified formats that too depend on the card length------		
		IF($all_options["cc_length"] == strlen($ccnumber)){
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
function pan_convertXtoN($chosen_format, $ccnumber){

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
Function pan_random_format($user_sel_format, $rand_card_length){

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
Function pan_random_seperator($user_sel_seperator, $rand_card_format){

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

//Will give a random card length
Function pan_random_length($user_sel_length){

		//----------------If there are more than 1 card length then pick a random one--------------------
		If($user_sel_length == "12-19"){
			$user_sel_length = "12,13,14,15,16,17,18,19";
		}
		Else if($user_sel_length == "16-19"){
			$user_sel_length = "16,17,18,19";
		}

		$get_length = explode(",", $user_sel_length);
			if (count($get_length) >= 1)
			$chosen_length = $get_length[rand(0, count($get_length)-1)];
	
		return $chosen_length;
}

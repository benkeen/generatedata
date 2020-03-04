import { DTMetadata, DTGenerateResult } from '../../../../types/dataTypes';
// import { creditCardFormats } from './formats';
// import { getRandomArrayValue } from '../../../utils/randomUtils';
import { PanState } from './PAN.ui';


export const rowStateReducer = ({ formats, example }: PanState): any => ({
	formats,
	ccCard: example
});

// data: GenerationData
export const generate = (): DTGenerateResult => {
	// console.log(data);
	// creditCardFormats[data.example]

	return { display: '' };
};

/*
	public function __construct($runtimeContext) {
		for ($i=622126; $i<=622925; $i++) {
            self::$creditCardData["discover"][] = $i;
		}
		for ($i=3528; $i<=3589; $i++) {
            self::$creditCardData["jcb16"][] = $i;
		}
		parent::__construct($runtimeContext);
	}

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];

		if ($options["cc_brand"] == "rand_card") {
			$options = $this->setRandomCardInfo($options);
		}

		$ccLength    = self::getRandomPANLength($options["cc_length"]);
		$ccFormat    = self::getRandomPANFormat($options["cc_format"], $ccLength);
		$ccSeparator = self::getRandomPANSeparator($options["cc_separator"]);

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

		$options["cc_brand"] = $selectedCard;
		$options["cc_format"] = $cardData["formats"][array_rand($cardData["formats"])];
		$options["cc_length"] = self::getRandomPANLength($cardData["length"]);

		return $options;
	}

	* @param $ccLength
	 * @param $ccFormat
	 * @param $ccSeparator
	 * @param $ccNumber
	 * @return array|bool|string
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

	 * Convert X's to the specified number
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

		$numPositions = count($positions);
		for ($i=0; $i<$numPositions; $i++) {
			$result[$i] = substr($ccnumber, 0, $positions[$i]-$i);
		}

		$result_f[0] = ($result[0]);
		for ($i=0; $i<$numPositions-1; $i++) {
			$result_f[$j] = substr($result[$j], $positions[$i]-$i);
			$j++;
		}
		$result_f[$numPositions] = substr($ccnumber, ($positions[$numPositions-1])-($numPositions-1));

		return $result_f;
	}


	// very confusing function. What does this do exactly? Why is it necessary?
	private static function getRandomPANFormat($userSelectedFormats, $randCardLength) {

		// if no format is selected then by default continuous number of that length will be displayed
		$defaultFormat = str_repeat("X", $randCardLength);
		if (empty($userSelectedFormats)) {
			return $defaultFormat;
		}

		// for ease of use, the API lets you pass formats as an array
		$formats = (is_array($userSelectedFormats)) ? $userSelectedFormats : explode("\n", $userSelectedFormats);

		$matchingFormats = array();
		foreach ($formats as $currFormat) {
			$count_X = 0; // get count of X's to match with the card length

			$len = strlen($currFormat);
			for ($i=0; $i<$len; $i++) {
				if ($currFormat[$i] == "X") { // PHP version of a charAt
					$count_X++;
				}
			}
			if ($count_X == $randCardLength) {
				$matchingFormats[] = $currFormat;
			}
		}

		if (empty($matchingFormats)) {
			return $defaultFormat;
		} else {
			$chosenFormat = $matchingFormats[mt_rand(0, count($matchingFormats)-1)];
			return trim($chosenFormat);
		}
	}

	private static function getRandomPANSeparator($separators) {
		$separatorList = explode("|", $separators);
		$chosenSep = $separatorList[rand(0, count($separatorList)-1)];

		// if no separator was entered
		if ($separators == "") {
			$chosenSep = " ";
		}
		return $chosenSep;
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

	// --------------------------------------------------------------------------------------------
	// Public functions

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
*/

// const generateCreditCardNumber = (prefixList: string[], length: number) => {

// 	// why is this call ccNumber? It was a prefix...
// 	const ccNumber = getRandomArrayValue(prefixList);

// // generate digits
// $count = strlen($ccNumber);
// while ($count < ($length - 1)) {
// 	$ccNumber .= mt_rand(0, 9);
// 	$count++;
// }

// // calculate sum
// $sum = 0;
// $pos = 0;

// $reversedCCnumber = strrev($ccNumber);
// while ($pos < $length - 1) {
// 	$odd = $reversedCCnumber[$pos]*2;
// 	if ($odd > 9) {
// 		$odd -= 9;
// 	}
// 	$sum += $odd;

// 	if ($pos != ($length - 2)) {
// 		$sum += $reversedCCnumber[$pos+1];
// 	}
// 	$pos += 2;
// }

// // calculate check digit
// $checkDigit = ((floor($sum/10) + 1) * 10 - $sum) % 10;
// $ccNumber .= $checkDigit;

// return $ccNumber;
// }

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

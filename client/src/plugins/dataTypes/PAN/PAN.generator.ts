import { DTMetadata, DTGenerateResult, DTOnMessage, DTGenerationData } from '~types/dataTypes';
// import { creditCardFormats } from './formats';
import utils from '../../../utils';
import { PanState } from './PAN';


export const rowStateReducer = ({ cardFormats, example }: PanState): any => ({
	cardFormats,
	ccCard: example
});

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const cards = Object.keys(data.rowState.cardFormats);
	const randomCard = utils.randomUtils.getRandomArrayValue(cards);

	const { formats, prefix } = data.rowState.cardFormats[randomCard];
	const randomPrefix: number = utils.randomUtils.getRandomArrayValue(prefix);
	const randomFormat: string = utils.randomUtils.getRandomArrayValue(formats);

	return {
		display: generatePAN(randomPrefix, randomFormat),
		cardType: randomCard
	};
};


let utilsLoaded = false;
export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

const generatePAN = (prefix: number, format: string) => {
	let panNums: string = utils.randomUtils.generateRandomAlphanumericStr(format.replace(/[^X]/g, ''));

	const numChars = panNums.length;
	const reversedNums = utils.stringUtils.reverse(panNums);

	// calculate sum
	let sum = 0;
	let pos = 0;
	while (pos < numChars-1) {
		const currentNum: number = +reversedNums[pos];
		let odd = currentNum*2;
		if (odd > 9) {
			odd -= 9;
		}
		sum += odd;

		if (pos != (numChars - 2)) {
			sum += +reversedNums[pos+1];
		}
		pos += 2;
	}

	// calculate check digit
	const checkDigit = ((Math.floor(sum/10) + 1) * 10 - sum) % 10;
	panNums += checkDigit;

	return panNums;
};


/*
	// ??????
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
*/


export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

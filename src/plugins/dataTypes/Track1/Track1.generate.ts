import { DTMetadata, DTGenerateResult } from '../../../../types/dataTypes';
// import { getRandomArrayValue } from '../../../utils/randomUtils';

// data: GenerationData
export const generate = (): DTGenerateResult => {
	// const selectedCardData = getRandomArrayValue(cardData);
	// $generatedCardNumber = DataType_PAN::generateCreditCardNumber($cardData["prefix"], $cardData["length"]);

	// $characters = array("A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z");
	// $totalChars = count($characters);
	// $chars = array();
	// while (count($chars) < 4) {
	// 	$char = $characters[mt_rand(0, $totalChars-1)];
	// 	if (!in_array($char, $chars)) {
	// 		$chars[] = $char;
	// 	}
	// }

	// $calendar = date("ym", mt_rand());
	// $serviceCode = mt_rand(111, 999);
	// $discretionaryData = array(rand(1, 9), rand(111, 999), rand(1111, 9999));
	// $disc_data = array_rand($discretionaryData);
	// $LRC_array = array(" ", rand(1, 9));
	// $LRC = array_rand($LRC_array);
	// $firstName = $this->firstNames[mt_rand(0, $this->numFirstNames-1)];
	// $lastName  = $this->lastNames[mt_rand(0, $this->numLastNames-1)];

	/*
		Source - http://en.wikipedia.org/wiki/Magnetic_stripe_card#Financial_cards

		Start sentinel — one character (generally '%')
		Format code = "B" — one character (alpha only)
		Primary account number (PAN) — up to 19 characters. Usually, but not always, matches the credit card number
			printed on the front of the card.
		Field Separator — one character (generally '^')
		Name — two to 26 characters
		Field Separator — one character (generally '^')
		Expiration date — four characters in the form YYMM.
		Service code — three characters
		Discretionary data — may include Pin Verification Key Indicator (PVKI, 1 character), PIN Verification
			Value (PVV, 4 characters), Card Verification 	Value or Card Verification Code (CVV or CVC, 3 characters)
		End sentinel — one character (generally '?')
		Longitudinal redundancy check (LRC) — it is one character and a validity character calculated from other
			data on the track.
	*/
	const track1 = "%B$generatedCardNumber^{$firstName}{$lastName}^$calendar$serviceCode{$discretionaryData[$disc_data]}?$LRC_array[$LRC]";

	return {
		display: track1
	};
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

/*
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

		if (class_exists("DataType_Names")) {
			$names = new DataType_Names("generation");
			$this->firstNames = $names->getFirstNames();
			$this->numFirstNames = count($this->firstNames);
			$this->lastNames = $names->getLastNames();
			$this->numLastNames = count($this->lastNames);
		}
	}
}
*/
/**
 * @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh <zeeshanyshaikh@gmail.com>
 * @package DataTypes
 * @description this class has a hard dependency on the PAN class NAMES class. That class contains a few public
 *              helper functions.
 */ 
import { DTMetadata, DTGenerateResult } from '../../../../types/dataTypes';

export const generate = (): DTGenerateResult => { // data: GenerationData
	return { display: '' };
};


/* private $cardData;


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
		$discretionaryData = array(rand(1, 9),rand(111, 999), rand(1111, 9999));
		$discData = array_rand($discretionaryData);
		$LRC_array = array(" ", rand(1, 9));
		$LRC = array_rand($LRC_array);

		// Source - http://en.wikipedia.org/wiki/Magnetic_stripe_card#Financial_cards
		// Start sentinel ó one character (generally ';')
		// Primary account number (PAN) ó up to 19 characters. Usually, but not always, matches the credit card
		// 	number printed on the front of the card.
		// Separator ó one char (generally '=')
		// Expiration date ó four characters in the form YYMM.
		// Service code ó three digits. The first digit specifies the interchange rules, the second specifies
		// 	authorisation processing and the third specifies the range of services
		// Discretionary data ó as in track one
		// End sentinel ó one character (generally '?')
		// Longitudinal redundancy check (LRC) ó it is one character and a validity character calculated from
		// 	other data on the track.
		// Most reader devices do not return this value when the card is swiped to the presentation layer, and
		// 	use it only to verify the input internally to the reader.
		$track2 = ";$generatedCardNumber={$calendar}{$serviceCode}$discretionaryData[$discData]?$LRC_array[$LRC]";

		return array(
			"display" => $track2
		);
	}
*/

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

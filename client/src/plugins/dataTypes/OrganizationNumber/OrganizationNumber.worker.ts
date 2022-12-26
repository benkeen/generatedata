import { DTGenerateResult } from '~types/dataTypes';

// data: GenerationData
export const generate = (): DTGenerateResult => {
	return { display: '' };
};


/*
	private $generatedOrgNrs = array();
	static $sep = "-";

	 * Generate a random personal number, and return the display string and additional meta data for use
	 * by any other Data Type.
	public function generate($generator, $generationContextData) {
		$generationOptions = $generationContextData["generationOptions"];

		// Default, 10 siffers + '-'
		// TODO: support several countries?
                static::$sep = self::getOrganisationNumberSeparator($generationOptions["cc_separator"]);

		$orgnr = $this->generateRandomSwedishOrganisationNumber(static::$sep);

		// pretty sodding unlikely, but just in case!
		while (in_array($orgnr, $this->generatedOrgNrs)) {
			$orgnr = $this->generateRandomSwedishOrganisationNumber(static::$sep);
		}
		$this->generatedOrgNrs[] = $orgnr;
		return array(
			"display" => $orgnr
		);
	}

	// TODO: add support for separator
	// TODO: add support for organisation numbers
	private static function generateRandomSwedishOrganisationNumber($sep) {
		$new_str = "";
		$rand = 0;

		$cnt = 11;	// 10 siffers + 1 increment for separator

		for ($i=0; $i<$cnt; $i++) {
			switch ($i) {
				case 0:
					$rand = mt_rand(0, 99);
					$new_str .= sprintf("%02d", $rand);
					break;
				case 2:
					$rand = mt_rand(20, 99);
					$new_str .= sprintf("%02d", $rand);
					break;
				case 4:
					$rand = mt_rand(0, 99);
					$new_str .= sprintf("%02d", $rand);
					break;
				case 6:
					$new_str .= $sep;
					break;
				case 7:
					$rand = mt_rand(0, 999);
					$new_str .= sprintf("%03d", $rand);
					break;
				case 10:
					// Same calculation as for personal numbers
					// TODO: move to Utils??
					$ctrl = DataType_PersonalNumber::recalcCtrl($new_str . "0", $sep);
					$new_str .= sprintf("%01d", $ctrl);
					break;
				default:
					break;
			}
		}

		return $new_str;
	}

	private static function getOrganisationNumberSeparator($separators) {
		$separatorList = explode("|", $separators);
		$chosenSep = $separatorList[rand(0, count($separatorList)-1)];

		// if no separator was entered use '' as default
		if ($separators == "") {
			$chosenSep = "";
		}
		return $chosenSep;
	}

*/

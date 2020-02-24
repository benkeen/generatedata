import { DTGenerateResult, DTMetadata } from '../../../../types/dataTypes';

export const generate = (): DTGenerateResult => {
	return { display: '' };
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(100) default NULL',
		field_Oracle: 'varchar2(100) default NULL',
		field_MSSQL: 'VARCHAR(100) NULL'
	}
});


/*
class DataType_Currency extends DataTypePlugin {
	protected $dataTypeName = "Currency";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 60;
	protected $jsModules = array("Currency.js");

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {

		}
	}

	// meh. All this string manipulation code could be improved, I'm sure
	public function generate($generator, $generationContextData) {
		$rangeFrom    = preg_replace("/\D/", "", $generationContextData["generationOptions"]["rangeFrom"]);
		$rangeTo      = preg_replace("/\D/", "", $generationContextData["generationOptions"]["rangeTo"]);
		$format       = $generationContextData["generationOptions"]["format"];
		$dollarSymbol = $generationContextData["generationOptions"]["symbol"];
		$dollarSymbolLocation = $generationContextData["generationOptions"]["symbolLocation"];

		$randString = (string) mt_rand($rangeFrom, $rangeTo);
		$randStringRev = strrev($randString);
		$randStringRevLength = strlen($randStringRev);
		$reversedFormat = strrev($format);

		$display = "";

		$randNumIndex = 0;
		$reversedFormatStrLen = strlen($reversedFormat);
		for ($i=0; $i<$reversedFormatStrLen; $i++) {
			if ($i > $randStringRevLength) {
				break;
			}
			if ($reversedFormat[$i] == "X") {
				$display .= $randStringRev[$randNumIndex];
				$randNumIndex++;
			} else {
				$display .= $reversedFormat[$i];
			}
		}
		$display = strrev($display);

		// if it's under 1 dollar (or whatever) and has cents, we need to fix really small generated
		// nums. Pretty feeble logic here, and I'm not 100% sure this will work for all currency formats
		$hasCents = preg_match("/\D/", $format[strlen($format)-3]);
		$numChars = strlen($display);

		if ($hasCents && $numChars < 4) {
			$truncatedFormat = preg_replace("/X/", "0", substr($format, -4));

			if ($numChars === 0) {
				$display = $truncatedFormat;
			} else if ($numChars == 1) {
				$display = substr($truncatedFormat, 0, 3) . $display;
			} else if ($numChars == 2) {
				$display = substr($truncatedFormat, 0, 2) . $display;
			} else if ($numChars == 3) {
				$display = "0" . $display;
			}
		}

		// if $display begins with a non-digit, we need to prefix it with a zero
		if (preg_match("/\D/", $display[0])) {
			$display = "0" . $display;
		}

		// apply the dollar symbol
		if (!empty($dollarSymbol)) {
			if ($dollarSymbolLocation == "prefix") {
				$display = $dollarSymbol . $display;
			} else {
				$display = $display . $dollarSymbol;
			}
		}

		return array(
			"display" => $display
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		$generationOptions = array(
			"format"         => $postdata["dtCurrencyFormat_$colNum"],
			"rangeFrom"      => $postdata["dtCurrencyRangeFrom_$colNum"],
			"rangeTo"        => $postdata["dtCurrencyRangeTo_$colNum"],
			"symbol"         => $postdata["dtCurrencySymbol_$colNum"],
			"symbolLocation" => $postdata["dtCurrencySymbolLocation_$colNum"]
		);

		return $generationOptions;
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$generationOptions = array(
			"format"         => $json->settings->format,
			"rangeFrom"      => $json->settings->rangeFrom,
			"rangeTo"        => $json->settings->rangeTo,
			"symbol"         => $json->settings->symbol,
			"symbolLocation" => $json->settings->symbolLocation
		);

		return $generationOptions;
	}
}
*/


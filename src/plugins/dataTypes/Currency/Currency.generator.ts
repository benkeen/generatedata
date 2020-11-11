import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';

let utilsLoaded = false;

const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { example, format, from, to, currencySymbol, currencySymbolLocation } = data.rowState;

/*
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
*/

// 	return array(
// 		"display" => $display
// );
	return { display: '' };
};

export {};



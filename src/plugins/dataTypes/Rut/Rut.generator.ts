import { DTGenerateResult } from '~types/dataTypes';
import { ETMessageData, ETOnMessage } from '~types/exportTypes';
import utils from '../../../utils';

let utilsLoaded = false;

const onmessage = (e: ETOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export {};


export const generate = (data: ETMessageData): DTGenerateResult => {
	console.log(data);

	/*
	$rowRutInfo = array();
	while (list($key, $info) = each($generationContextData["existingRowData"])) {
		if ($info["dataTypeFolder"] == "Rut") {
			$rowRutInfo = $info;
			break;
		}
	}
	reset($generationContextData["existingRowData"]);

	if (!empty($rowRutInfo)) {
        $rutn = $info["randomData"]["rut"];
        $digit = $info["randomData"]["digit"];
	} else {
		$rutn = sprintf("%d%03d%03d", mt_rand(5, 50), mt_rand(0,999), mt_rand(0,999));
        $digit = $this->getDigit($rutn);
    }
	*/

	const { getRandomNum } = utils.randomUtils;
	const rutNumber = `${getRandomNum(5, 50)}${getRandomNum(0, 999)}${getRandomNum(0,999)}`;
	const digit = getDigit(rutNumber);

	let display = "";

	/*
    if (strpos($options["formatCode"], "xxxxxxxx") !== false) {
        if ($options["thousep"]) {
            $display = number_format($rutn, 0, ",", ".");
        } else {
            $display = $rutn;
        }
    }

    if (strpos($options["formatCode"], "xxxxxxxx-y") !== false) {
        if (!$options["remdash"]) { // remove dash
            $display .= "-";
        }
    }

	if (strpos($options["formatCode"], "y") !== false) {
		if ($options["upper"]) { // upper case digit???
			$display .= strtoupper($digit);
		} else {
			$display .= $digit;
		}
	}
	*/

	return {
		display: '',
		rut: '',
		digit: ''
	};
};

const getDigit = (rut: string) => {
	const rutNumReversedChars = rut.split('').reverse();

	let i, n;

	// TODO old PHP code. Not verified when moved to JS
	for (i = 0, n = 0;
		 i<rutNumReversedChars.length;
		 n += parseInt(rutNumReversedChars[i], 10) * (i % 6 + 2), i++);

	const digit = 11 - n % 11;

	if (digit == 10) {
		return "k";
	}
	if (digit == 11) {
		return "0";
	}

	return digit;
};


























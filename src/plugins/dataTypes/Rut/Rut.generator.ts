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
	const { formatCode, remDash, thousandSep, upper } = data.rowState;

	const { getRandomNum } = utils.randomUtils;
	const rutNumber = `${getRandomNum(5, 50)}${getRandomNum(0, 999)}${getRandomNum(0,999)}`;
	const digit = getDigit(rutNumber);

	let display = "";

    if (formatCode.indexOf('xxxxxxxx') !== -1) {
        if (thousandSep) {
            display = utils.numberUtils.numberFormat(Number(rutNumber), 0, ",", ".");
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

	let n = 0;
	for (let i=0; i<rutNumReversedChars.length; i++) {
		n += parseInt(rutNumReversedChars[i], 10) * (i % 6 + 2);
	}

	const digit = 11 - n % 11;

	if (digit == 10) {
		return "k";
	}
	if (digit == 11) {
		return "0";
	}

	return digit;
};


























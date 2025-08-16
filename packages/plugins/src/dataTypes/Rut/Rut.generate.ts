import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { formatCode, uppercaseDigit } = rowState;

	const { getRandomNum } = utils.randomUtils;
	const rutNumber = `${getRandomNum(5, 50)}${getRandomNum(0, 999)}${getRandomNum(0,999)}`;
	const digit = getDigit(rutNumber);

	let display = '';

	if (formatCode === '12.345.678-9' || formatCode === '12.345.678-9' || formatCode === '12.345.678') {
		display = utils.numberUtils.numberFormat(Number(rutNumber), 0, ',', '.');
	} else if (formatCode === '12345678-9' || formatCode === '123456789' || formatCode === '12345678') {
		display = rutNumber;
	}

	if (formatCode.indexOf('-') !== -1) {
		display += '-';
	}

	if (formatCode.indexOf('9') !== -1) {
		display += ((uppercaseDigit) ? digit.toUpperCase() : digit);
	}

	return {
		display,
		rut: rutNumber,
		digit
	};
};

const getDigit = (rut: string): string => {
	const rutNumReversedChars = rut.split('').reverse();

	let n = 0;
	for (let i=0; i<rutNumReversedChars.length; i++) {
		n += parseInt(rutNumReversedChars[i], 10) * (i % 6 + 2);
	}

	const digit = 11 - n % 11;

	if (digit == 10) {
		return 'k';
	}
	if (digit == 11) {
		return '0';
	}

	return digit.toString();
};

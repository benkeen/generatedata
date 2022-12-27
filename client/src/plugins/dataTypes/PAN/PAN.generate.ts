import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

let utils: WorkerUtils;

export const generate = (data: DTGenerationData, workerUtils: WorkerUtils): DTGenerateResult => {
	utils = workerUtils;

	const cards = Object.keys(data.rowState.cardFormats);
	if (!cards.length) {
		return { display: '' };
	}

	const randomCard = utils.randomUtils.getRandomArrayValue(cards);

	const { formats, prefix } = data.rowState.cardFormats[randomCard];
	const randomPrefix: number = utils.randomUtils.getRandomArrayValue(prefix);
	const randomFormat: string = utils.randomUtils.getRandomArrayValue(formats);

	const shouldDisplay = !!randomPrefix && !!randomFormat;

	return {
		display: shouldDisplay ? generatePAN(randomPrefix, randomFormat) : '',
		cardType: randomCard
	};
};

const generatePAN = (prefix: number, format: string): string => {
	// first, strip out the non-X formatting chars, we'll add them back in at the end
	const xChars = format.replace(/[^X]/g, '');
	const prefixStr = prefix.toString();

	let panNums = prefixStr + utils.randomUtils.generateRandomAlphanumericStr(xChars.substring(prefixStr.length+1));
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

	// lastly, convert it into the format provided
	let finalPan = '';
	let index = 0;

	for (let i=0; i<format.length; i++) {
		if (format[i] === 'X') {
			finalPan += panNums[index];
			index++;
		} else {
			finalPan += format[i];
		}
	}

	return finalPan;
};

import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

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
export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { nameSource, panSource, targetNameRowId, targetPanRowId } = data.rowState;

	let pan = '';
	if (panSource === 'random') {
		pan = utils.randomUtils.generateRandomAlphanumericStr('Xxxxxxxxxxxxxxxx');
	} else {
		const found = data.existingRowData.find(({ id }) => id === targetPanRowId);
		if (found) {
			pan = found.data.display as string;
		}
	}

	let name = '';
	if (nameSource === 'random') {
		name = utils.randomUtils.generateRandomAlphanumericStr('Lllllll Llllll');
	} else {
		const found = data.existingRowData.find(({ id }) => id === targetNameRowId);
		if (found) {
			name = found.data.display as string;
		}
	}

	// replace whitespace in the name and PAN
	const nameWithoutSpaces = name.replace(/\s+/g, '');
	const panWithoutSpaces = pan.replace(/[^\d]/g, '');

	const randYear = utils.stringUtils.padString(utils.randomUtils.getRandomNum(0, 99), 2);
	const randMonth = utils.stringUtils.padString(utils.randomUtils.getRandomNum(1, 12), 2);
	const date = `${randYear}${randMonth}`;
	const serviceCode = utils.randomUtils.getRandomNum(111, 999);

	// could be more efficient
	const discretionaryData = [
		utils.randomUtils.getRandomNum(1, 9),
		utils.randomUtils.getRandomNum(111, 999),
		utils.randomUtils.getRandomNum(1111, 9999)
	];
	const index = utils.randomUtils.getRandomNum(0, 2);
	const dataItem = discretionaryData[index];
	const lrc = utils.randomUtils.getRandomCharInString(' 123456789');

	return {
		display: `%B${panWithoutSpaces}^${nameWithoutSpaces}^${date}${serviceCode}${dataItem}?${lrc}`
	};
};

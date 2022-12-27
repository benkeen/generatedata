/**
 * @author Ben Keen <ben.keen@gmail.com>, original code Zeeshan Shaikh <zeeshanyshaikh@gmail.com>
 */
import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

/*
	Source - http://en.wikipedia.org/wiki/Magnetic_stripe_card#Financial_cards

	- Start sentinel: one character (generally ';')
	- Primary account number (PAN): up to 19 characters. Usually, but not always, matches the credit card
	  number printed on the front of the card.
	- Separator: one char (generally '=')
	- Expiration date: four characters in the form YYMM.
	- Service code: three digits. The first digit specifies the interchange rules, the second specifies
		authorisation processing and the third specifies the range of services
	- Discretionary data: as in track one
	- End sentinel: one character (generally '?')
	- Longitudinal redundancy check (LRC): it is one character and a validity character calculated from
		other data on the track.
	- Most reader devices do not return this value when the card is swiped to the presentation layer, and
		use it only to verify the input internally to the reader.
*/
export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { panSource, targetPanRowId } = data.rowState;

	let pan = '';
	if (panSource === 'random') {
		pan = utils.randomUtils.generateRandomAlphanumericStr('Xxxxxxxxxxxxxxxx');
	} else {
		const found = data.existingRowData.find(({ id }) => id === targetPanRowId);
		if (found) {
			pan = found.data.display as string;
		}
	}

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
		display: `%B${panWithoutSpaces}=${date}${serviceCode}${dataItem}?${lrc}`
	};
};

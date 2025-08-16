import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { from, to, currencySymbol, currencySymbolLocation, includeCents, thousandsSeparator, centsSeparator } = data.rowState;

	let minValue = from;
	let maxValue = to;
	let decimals = 0;
	if (includeCents) {
		minValue = from * 100;
		maxValue = to * 100;
		decimals = 2;
	}

	let randNum = utils.randomUtils.getRandomNum(minValue, maxValue);
	if (includeCents) {
		randNum = randNum/100;
	}

	const negativePrefix = (randNum < 0) ? '-' : '';

	let formatted = utils.numberUtils.numberFormat(Math.abs(randNum), decimals, centsSeparator, thousandsSeparator);

	if (currencySymbol) {
		if (currencySymbolLocation === 'prefix') {
			formatted = `${negativePrefix}${currencySymbol}${formatted}`;
		} else {
			formatted = `${negativePrefix}${formatted}${currencySymbol}`;
		}
	}

	return {
		display: formatted
	};
};

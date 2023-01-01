import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WeightedListType } from './WeightedList.state';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { listType, values, exactly, betweenLow, betweenHigh, delimiter, allowDuplicates } = data.rowState;
	const numValues = Object.keys(values).length;

	let items: any = [];
	if (listType === WeightedListType.exactly) {
		items = utils.randomUtils.getRandomWeightedSubset(values, exactly, allowDuplicates);
	} else if (betweenLow && betweenHigh) {
		const numItems = utils.randomUtils.getRandomNum(betweenLow, betweenHigh);
		items = utils.randomUtils.getRandomWeightedSubset(values, numItems, allowDuplicates);
	} else if (betweenLow) {
		if (betweenLow <= numValues) {
			const numItems = utils.randomUtils.getRandomNum(betweenLow, numValues);
			items = utils.randomUtils.getRandomWeightedSubset(values, numItems, allowDuplicates);
		}
	} else if (betweenHigh !== '') {
		const numItems = utils.randomUtils.getRandomNum(0, betweenHigh);
		items = utils.randomUtils.getRandomWeightedSubset(values, numItems, allowDuplicates);
	}

	return {
		display: items.join(delimiter)
	};
};

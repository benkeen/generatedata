import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { ListType } from './List.state';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { listType, values, exactly, betweenLow, betweenHigh, delimiter } = data.rowState;

	let items: any = [];
	if (listType === ListType.exactly) {
		items = utils.randomUtils.getRandomSubset(values, exactly);
	} else if (betweenLow && betweenHigh) {
		const numItems = utils.randomUtils.getRandomNum(betweenLow, betweenHigh);
		items = utils.randomUtils.getRandomSubset(values, numItems);
	} else if (betweenLow) {
		if (betweenLow <= values.length) {
			const numItems = utils.randomUtils.getRandomNum(betweenLow, values.length);
			items = utils.randomUtils.getRandomSubset(values, numItems);
		}
	} else if (betweenHigh !== '') {
		const numItems = utils.randomUtils.getRandomNum(0, betweenHigh);
		items = utils.randomUtils.getRandomSubset(values, numItems);
	}

	return {
		display: items.join(delimiter)
	};
};

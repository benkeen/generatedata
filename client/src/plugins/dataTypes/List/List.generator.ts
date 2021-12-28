import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';
import { ListType } from './List';

export const generate = (data: DTGenerationData): DTGenerateResult => {
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
	} else {
		const numItems = utils.randomUtils.getRandomNum(0, betweenHigh);
		items = utils.randomUtils.getRandomSubset(values, numItems);
	}

	return {
		display: items.join(delimiter)
	};
};

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

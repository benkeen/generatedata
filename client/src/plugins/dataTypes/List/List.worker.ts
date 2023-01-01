import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult, DTWorkerOnMessage } from '~types/dataTypes';
import { ListType } from './List.state';

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
	} else if (betweenHigh !== '') {
		const numItems = utils.randomUtils.getRandomNum(0, betweenHigh);
		items = utils.randomUtils.getRandomSubset(values, numItems);
	}

	return {
		display: items.join(delimiter)
	};
};

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

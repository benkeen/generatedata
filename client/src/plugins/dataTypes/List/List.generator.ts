import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';
import { ListType } from './List';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { listType, values, exactly, atMost, delimiter } = data.rowState;

	const delim = delimiter ? delimiter : ', ';
	let val = '';
	let items;
	if (listType === ListType.exactly) {
		items = utils.randomUtils.getRandomSubset(values, exactly);
		val = items.join(delim);
	} else {
		const numItems = utils.randomUtils.getRandomNum(0, atMost);
		items = utils.randomUtils.getRandomSubset(values, numItems);
		val = items.join(delim);
	}

	return {
		display: val
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

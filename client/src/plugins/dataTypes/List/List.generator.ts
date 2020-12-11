import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { listType, values, exactly, atMost } = data.rowState;

	let val = '';
	if (listType === 'exactly') {
		val = utils.randomUtils.getRandomSubset(values, exactly).join(', ');
	} else {
		const numItems = utils.randomUtils.getRandomNum(0, atMost);
		val = utils.randomUtils.getRandomSubset(values, numItems).join(', ');
	}

	return { display: val };
};

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

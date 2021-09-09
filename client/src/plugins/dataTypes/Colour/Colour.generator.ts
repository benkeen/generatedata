import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const formats = data.rowState;

	let val = '';
	if (formats.length) {
		let chosenFormat = formats[0];
		if (formats.length > 1) {
			chosenFormat = formats[utils.randomUtils.getRandomNum(0, formats.length - 1)];
		}
		val = chosenFormat.trim();
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

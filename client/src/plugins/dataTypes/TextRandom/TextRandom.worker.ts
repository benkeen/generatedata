import { DTWorkerGenerationData, DTGenerateResult, DTWorkerOnMessage } from '~types/dataTypes';
import utils from '../../../utils';

let utilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = (data: DTWorkerGenerationData): DTGenerateResult => {
	const { fromStart, minWords, maxWords, words } = data.rowState;
	const textStr = utils.randomUtils.generateRandomTextStr(words, fromStart, minWords, maxWords);
	return {
		display: textStr
	};
};

import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';
import utils from '../../../utils';

let utilsLoaded = false;
export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { fromStart, minWords, maxWords, words } = data.rowState;
	const textStr = utils.randomUtils.generateRandomTextStr(words, fromStart, minWords, maxWords);
	return {
		display: textStr
	};
};

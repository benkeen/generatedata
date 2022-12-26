import utils from '../../../utils';
import { DTWorkerGenerationData, DTGenerateResult, DTWorkerOnMessage } from '~types/dataTypes';

let utilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = ({ rowState }: DTWorkerGenerationData): DTGenerateResult => {
	const { words, numWordsToGenerate } = rowState;
	const textStr = utils.randomUtils.generateRandomTextStr(words, false, numWordsToGenerate);

	return {
		display: textStr
	};
};

import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';

let utilsLoaded = false;
const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = ({ rowState }: DTGenerationData): DTGenerateResult => {
	const { words, numWordsToGenerate } = rowState;
	const textStr = utils.randomUtils.generateRandomTextStr(words, false, numWordsToGenerate);

	return {
		display: textStr
	};
};

export {};

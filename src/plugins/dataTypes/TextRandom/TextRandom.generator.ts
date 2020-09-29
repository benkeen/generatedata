import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import utils from '../../../utils';

let utilsLoaded = false;
const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { startsWithLipsum, minWords, maxWords } = data.rowState;
	const { words } = utils.stringUtils.getLipsumWords();
	const textStr = utils.randomUtils.generateRandomTextStr(words, startsWithLipsum, minWords, maxWords);
	return {
		display: textStr
	};
};

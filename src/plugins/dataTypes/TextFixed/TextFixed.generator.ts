import utils from '../../../utils';
import { DTMetadata, DTGenerationData, DTGenerateResult } from '~types/dataTypes';

let utilsLoaded = false;
const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = ({ rowState }: DTGenerationData): DTGenerateResult => {
	const { words } = utils.stringUtils.getLipsumWords();
	const textStr = utils.randomUtils.generateRandomTextStr(words, false, rowState.numWords);
	return {
		display: textStr
	};
};

export {};

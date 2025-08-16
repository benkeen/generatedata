import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { fromStart, minWords, maxWords, words } = data.rowState;
	const textStr = utils.randomUtils.generateRandomTextStr(words, fromStart, minWords, maxWords);
	return {
		display: textStr
	};
};

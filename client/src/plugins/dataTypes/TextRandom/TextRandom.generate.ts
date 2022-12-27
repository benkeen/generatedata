import { DTWorkerGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTWorkerGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { fromStart, minWords, maxWords, words } = data.rowState;
	const textStr = utils.randomUtils.generateRandomTextStr(words, fromStart, minWords, maxWords);
	return {
		display: textStr
	};
};

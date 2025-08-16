import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { words, numWordsToGenerate } = rowState;
	const textStr = utils.randomUtils.generateRandomTextStr(words, false, numWordsToGenerate);

	return {
		display: textStr
	};
};

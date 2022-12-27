import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const item: string = utils.randomUtils.getRandomArrayValue(rowState);
	return {
		display: utils.randomUtils.generateRandomAlphanumericStr(item)
	};
};

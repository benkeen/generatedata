import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	// for backward compatibility
	const value = Array.isArray(rowState) ? rowState : rowState.option;
	const item: string = utils.randomUtils.getRandomArrayValue(value);

	return {
		display: utils.randomUtils.generateRandomAlphanumericStr(item)
	};
};

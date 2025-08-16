import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { min, max } = rowState;

	return {
		display: utils.randomUtils.getRandomNum(min, max)
	};
};

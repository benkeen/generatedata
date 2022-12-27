import { WorkerUtils } from '~utils/workerUtils';
import { DTGenerateResult } from '~types/dataTypes';

export const generate = (data: any, utils: WorkerUtils): DTGenerateResult => {
	return {
		display: utils.randomUtils.getRandomNum(1111, 9999)
	};
};

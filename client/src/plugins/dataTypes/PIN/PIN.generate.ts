import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: any, utils: WorkerUtils) => {
	return {
		display: utils.randomUtils.getRandomNum(1111, 9999)
	};
};

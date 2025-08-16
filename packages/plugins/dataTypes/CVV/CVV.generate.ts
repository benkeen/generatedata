// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import { DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (_data: any, utils: WorkerUtils): DTGenerateResult => ({
	display: utils.randomUtils.getRandomNum(111, 999)
});

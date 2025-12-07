// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import type { WorkerUtils } from '@generatedata/utils/worker';
import { DTGenerateResult } from '../../';

export const generate = (_data: any, utils: WorkerUtils): DTGenerateResult => ({
  display: utils.randomUtils.getRandomNum(111, 999)
});

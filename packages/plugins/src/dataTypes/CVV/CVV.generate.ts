// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import { DTGenerateResult, WorkerUtils } from '../../';

export const generate = (_data: any, utils: WorkerUtils): DTGenerateResult => ({
  display: utils.randomUtils.getRandomNum(111, 999)
});

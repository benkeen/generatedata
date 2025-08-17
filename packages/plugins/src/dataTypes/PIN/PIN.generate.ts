import { WorkerUtils } from '../../';
import { DTGenerateResult } from '~types/dataTypes';

export const generate = (data: any, utils: WorkerUtils): DTGenerateResult => {
  return {
    display: utils.randomUtils.getRandomNum(1111, 9999)
  };
};

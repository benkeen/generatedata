import type { WorkerUtils } from '@generatedata/utils/worker';
import { DTGenerateResult } from '../../';

export const generate = (data: any, utils: WorkerUtils): DTGenerateResult => {
  return {
    display: utils.randomUtils.getRandomNum(1111, 9999)
  };
};

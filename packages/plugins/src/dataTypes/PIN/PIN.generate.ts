import { DTGenerateResult, WorkerUtils } from '../../';

export const generate = (data: any, utils: WorkerUtils): DTGenerateResult => {
  return {
    display: utils.randomUtils.getRandomNum(1111, 9999)
  };
};

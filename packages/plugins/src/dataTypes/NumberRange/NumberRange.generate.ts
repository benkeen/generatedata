import type { WorkerUtils } from '@generatedata/utils/worker';
import { DTGenerateResult, DTGenerationData } from '../../';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { min, max } = rowState;

  return {
    display: utils.randomUtils.getRandomNum(min, max)
  };
};

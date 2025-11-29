import { DTGenerateResult, DTGenerationData, WorkerUtils } from '../../';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { min, max } = rowState;

  return {
    display: utils.randomUtils.getRandomNum(min, max)
  };
};

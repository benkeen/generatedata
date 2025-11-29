import { DTGenerateResult, DTGenerationData, WorkerUtils } from '../../';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { fromStart, minWords, maxWords, words } = data.rowState;
  const textStr = utils.randomUtils.generateRandomTextStr(words, fromStart, minWords, maxWords);
  return {
    display: textStr
  };
};

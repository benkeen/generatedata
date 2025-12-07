import type { WorkerUtils } from '@generatedata/utils/worker';
import { DTGenerateResult, DTGenerationData } from '../../';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { words, numWordsToGenerate } = rowState;
  const textStr = utils.randomUtils.generateRandomTextStr(words, false, numWordsToGenerate);

  return {
    display: textStr
  };
};

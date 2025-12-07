import type { WorkerUtils } from '@generatedata/utils/worker';
import { format, fromUnixTime } from 'date-fns';
import { DTGenerateResult, DTGenerationData } from '../../';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { fromTime, toTime, format: displayFormat } = data.rowState;
  if (!displayFormat) {
    return { display: '' };
  }
  const time = utils.randomUtils.getRandomNum(fromTime, toTime);

  let display = '';
  try {
    display = format(fromUnixTime(time), displayFormat);
  } catch (e) {}

  return {
    display
  };
};

import { DTGenerateResult, DTGenerationData, WorkerUtils } from '../../';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const rowNum = data.rowNum;
  const { incrementStart, incrementValue, incrementPlaceholder } = data.rowState;

  let value = (rowNum - 1) * incrementValue + incrementStart;
  if (incrementPlaceholder) {
    value = utils.generalUtils.template(incrementPlaceholder, { INCR: value });
  }
  return { display: value };
};

import type { WorkerUtils } from '@generatedata/utils/worker';
import { DTGenerateResult, DTGenerationData, DTGenerationExistingRowData } from '../../';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const placeholders: any = {};

  data.existingRowData.forEach((row: DTGenerationExistingRowData) => {
    placeholders[`ROW${row.colIndex + 1}`] = row.data.display;
    placeholders[`ROWDATA${row.colIndex + 1}`] = row;
  });
  placeholders.ROWNUM = data.rowNum;

  return {
    display: utils.generalUtils.template(data.rowState.value, placeholders)
  };
};

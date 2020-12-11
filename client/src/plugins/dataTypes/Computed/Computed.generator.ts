import utils from '../../../utils';
import { DTGenerateResult, DTGenerationData, DTGenerationExistingRowData, DTOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const placeholders: any = {};

	data.existingRowData.forEach((row: DTGenerationExistingRowData) => {
		placeholders[`ROW${row.colIndex+1}`] = row.data.display;
		placeholders[`ROWDATA${row.colIndex+1}`] = row;
	});
	placeholders.ROWNUM = data.rowNum;

	return {
		display: utils.generalUtils.template(data.rowState.value, placeholders)
	};
};

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

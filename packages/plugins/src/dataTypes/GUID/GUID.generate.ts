import { DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

const generatedGUIDs: any = {};

export const generate = (_data: any, utils: WorkerUtils): DTGenerateResult => {
	const placeholderStr = 'HHHHHHHH-HHHH-HHHH-HHHH-HHHHHHHHHHHH';
	let guid = utils.randomUtils.generateRandomAlphanumericStr(placeholderStr);

	// pretty sodding unlikely, but just in case. Uniqueness is kinda the point of the Data Type after all.
	while (generatedGUIDs[guid]) {
		guid = utils.randomUtils.generateRandomAlphanumericStr(placeholderStr);
	}
	generatedGUIDs[guid] = true;

	return { display: guid };
};

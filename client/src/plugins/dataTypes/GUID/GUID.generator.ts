import { DTGenerateResult, DTOnMessage } from '~types/dataTypes';
import utils from '../../../utils';

const generatedGUIDs: any = {};

export const generate = (): DTGenerateResult => {
	const placeholderStr = "HHHHHHHH-HHHH-HHHH-HHHH-HHHHHHHHHHHH";
	let guid = utils.randomUtils.generateRandomAlphanumericStr(placeholderStr);

	// pretty sodding unlikely, but just in case. Uniqueness is kinda the point of the Data Type after all.
	while (generatedGUIDs[guid]) {
		guid = utils.randomUtils.generateRandomAlphanumericStr(placeholderStr);
	}
	generatedGUIDs[guid] = true;

	return { display: guid };
};

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate());
};

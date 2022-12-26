import utils from '../../../utils';
import { DTWorkerGenerationData, DTGenerateResult, DTWorkerOnMessage } from '~types/dataTypes';

let utilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = (data: DTWorkerGenerationData): DTGenerateResult => {
	const { protocolEnabled, protocolOptions, hostnameEnabled, hostnameOptions, pathEnabled, pathOptions, queryParamsEnabled, queryParamsOptions } = data.rowState;

	let url = '';
	if (protocolEnabled) {
		url += utils.randomUtils.getRandomArrayValue(protocolOptions);
	}
	if (hostnameEnabled) {
		url += utils.randomUtils.getRandomArrayValue(hostnameOptions);
	}
	if (pathEnabled) {
		url += '/' + utils.randomUtils.getRandomArrayValue(pathOptions);
	}
	if (queryParamsEnabled) {
		url += '?' + utils.randomUtils.getRandomArrayValue(queryParamsOptions);
	}

	return {
		display: url
	};
};

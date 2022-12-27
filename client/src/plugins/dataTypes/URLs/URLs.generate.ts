import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
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

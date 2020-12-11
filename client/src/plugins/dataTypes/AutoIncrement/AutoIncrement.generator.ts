import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';
import utils from '../../../utils';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const rowNum = data.rowNum;
	const { incrementStart, incrementValue, incrementPlaceholder } = data.rowState;

	let value = ((rowNum - 1) * incrementValue) + incrementStart;
	if (incrementPlaceholder) {
		value = utils.generalUtils.template(incrementPlaceholder, { INCR: value });
	}
	return { display: value };
};

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

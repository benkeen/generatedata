import { format, fromUnixTime } from 'date-fns';
import utils from '../../../utils';
import { DTWorkerGenerationData, DTGenerateResult, DTWorkerOnMessage } from '~types/dataTypes';

export const generate = (data: DTWorkerGenerationData): DTGenerateResult => {
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

let workerUtilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}

	postMessage(generate(e.data));
};

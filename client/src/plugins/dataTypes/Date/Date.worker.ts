import { format, fromUnixTime } from 'date-fns';
import utils from '../../../utils';
import { DTWorkerGenerationData, DTGenerateResult, DTWorkerOnMessage } from '~types/dataTypes';

export const generate = (data: DTWorkerGenerationData): DTGenerateResult => {
	const { fromDate, toDate, format: displayFormat } = data.rowState;
	if (!displayFormat) {
		return { display: '' };
	}
	const date = utils.randomUtils.getRandomNum(fromDate, toDate);
	return { display: format(fromUnixTime(date), displayFormat) };
};

let workerUtilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}

	postMessage(generate(e.data));
};

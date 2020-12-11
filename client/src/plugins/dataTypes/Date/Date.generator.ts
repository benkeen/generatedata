import { format, fromUnixTime } from 'date-fns';
import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { fromDate, toDate, format: displayFormat } = data.rowState;
	if (!displayFormat) {
		return { display: '' };
	}
	const date = utils.randomUtils.getRandomNum(fromDate, toDate);
	return { display: format(fromUnixTime(date), displayFormat) };
};

let workerUtilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	postMessage(generate(e.data));
};

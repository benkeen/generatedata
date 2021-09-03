import { format, fromUnixTime } from 'date-fns';
import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';

export const generate = (data: DTGenerationData): DTGenerateResult => {
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

export const onmessage = (e: DTOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	postMessage(generate(e.data));
};

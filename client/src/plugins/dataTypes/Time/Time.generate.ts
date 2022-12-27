import { format, fromUnixTime } from 'date-fns';
import { DTWorkerGenerationData, DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from "~utils/workerUtils";

export const generate = (data: DTWorkerGenerationData, utils: WorkerUtils): DTGenerateResult => {
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

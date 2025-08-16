import { format, fromUnixTime } from 'date-fns';
import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { isValidDateFormat } from '~utils/dateUtils';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { fromDate, toDate, format: displayFormat } = data.rowState;
	if (!displayFormat) {
		return { display: '' };
	}
	const date = utils.randomUtils.getRandomNum(fromDate, toDate);

	// if they entered an invalid date format the UI will let them know
	let display = '';
	if (isValidDateFormat(displayFormat)) {
		display = format(fromUnixTime(date), displayFormat);
	}

	return { display };
};

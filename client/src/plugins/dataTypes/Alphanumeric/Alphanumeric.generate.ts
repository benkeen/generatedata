import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = ({ rowState }: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {

	// for backward compatibility
	const value = Array.isArray(rowState) ? rowState : rowState.value;

	const formats = value.split('|');
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = formats[utils.randomUtils.getRandomNum(0, formats.length - 1)];
	}
	const val = utils.randomUtils.generateRandomAlphanumericStr(chosenFormat);

	return { display: val };
};


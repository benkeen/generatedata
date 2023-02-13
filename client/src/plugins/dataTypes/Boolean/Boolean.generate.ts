import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	// for backward compatibility
	const formats = Array.isArray(data.rowState) ? data.rowState : data.rowState.values;

	let val = '';
	if (formats.length) {
		let chosenFormat = formats[0];
		if (formats.length > 1) {
			chosenFormat = formats[utils.randomUtils.getRandomNum(0, formats.length - 1)];
		}
		val = chosenFormat.trim();
	}

	return { display: val };
};

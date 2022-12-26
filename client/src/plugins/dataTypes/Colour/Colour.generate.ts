import { DTGenerateResult, DTWorkerGenerationData } from "~types/dataTypes";
import rc from 'randomcolor';
import { ColourFormat } from "./Colour";
import { WorkerUtils } from "~utils/workerUtils";

export const generate = (data: DTWorkerGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { value, luminosity, format, alpha } = data.rowState;

	const display: any = rc({
		count: 1,
		hue: value,
		luminosity: luminosity,
		format,
		alpha: format === ColourFormat.rgba ? alpha : 1
	});

	return {
		display
	};
};

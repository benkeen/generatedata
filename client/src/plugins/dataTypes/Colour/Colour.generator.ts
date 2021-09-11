import rc from 'randomcolor';
import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';
import { ColourFormat } from './Colour';

export const generate = (data: DTGenerationData): DTGenerateResult => {
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


let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

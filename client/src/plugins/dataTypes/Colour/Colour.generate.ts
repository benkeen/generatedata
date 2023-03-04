import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import rc from 'randomcolor';
import { ColourFormatEnum } from './Colour.state';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { value, luminosity, format, alpha } = data.rowState;

	const display: any = rc({
		count: 1,
		hue: value,
		luminosity: luminosity,
		format,
		alpha: format === ColourFormatEnum.rgba ? alpha : 1
	});

	return {
		display
	};
};

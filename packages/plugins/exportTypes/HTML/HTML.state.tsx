import { ETState } from '~types/exportTypes';

export type ExportFormat = 'table' | 'ul' | 'dl';

export type GenerationOptionsType = {
	exportFormat: ExportFormat;
}

export const defaultGenerationOptions: GenerationOptionsType = {
	exportFormat: 'table'
};

export interface HTMLSettings extends ETState, GenerationOptionsType {}

export const initialState: HTMLSettings = {
	...defaultGenerationOptions,
	isValid: true // there's no way the config settings for the HTML ET can be misconfigured, so this is always true
};

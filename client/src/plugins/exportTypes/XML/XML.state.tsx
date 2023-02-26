import { ETState } from '~types/exportTypes';

export type GenerationOptionsType = {
	rootNodeName: string;
	recordNodeName: string;
	useCustomExportFormat?: boolean;
	customFormat?: string;
}

export const defaultGenerationOptions: GenerationOptionsType = {
	rootNodeName: 'records',
	recordNodeName: 'record',
	useCustomExportFormat: false,
	customFormat: ''
};

export interface XMLSettings extends ETState, GenerationOptionsType {}

export const initialState: XMLSettings = {
	...defaultGenerationOptions,
	isValid: true
};

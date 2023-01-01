import { ETState } from '~types/exportTypes';

export type JavascriptExportFormat = 'variable' | 'es6' | 'commonJs';

export type GenerationOptionsType = {
	jsExportFormat: JavascriptExportFormat;
}

export const defaultGenerationOptions: GenerationOptionsType = {
	jsExportFormat: 'variable',
};

export interface ProgrammingLanguageState extends ETState, GenerationOptionsType {}

export const initialState: ProgrammingLanguageState = {
	...defaultGenerationOptions,
	isValid: true
};

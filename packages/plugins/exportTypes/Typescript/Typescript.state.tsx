import { ETState } from '~types/exportTypes';

export type GenerationOptionsType = {
	typeName: string;
	varName: string;
}

export const defaultGenerationOptions: GenerationOptionsType = {
	typeName: 'RandomData',
	varName: 'data'
};

export interface TypescriptSettings extends ETState, GenerationOptionsType {}

export const initialState: TypescriptSettings = {
	...defaultGenerationOptions,
	isValid: true
};

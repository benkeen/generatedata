import { ETState } from '~types/exportTypes';

export type DataStructureFormat = 'simple' | 'complex';

export interface GenerationOptionsType {
	dataStructureFormat: DataStructureFormat;
}

export interface JSONSettings extends ETState, GenerationOptionsType {}

export const initialState: JSONSettings = {
	dataStructureFormat: 'simple',
	isValid: true
};

export const defaultGenerationOptions = initialState;


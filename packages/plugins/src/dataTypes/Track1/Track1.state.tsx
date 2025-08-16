export type Track1Source = 'row' | 'random';

export type Track1State = {
	panSource: Track1Source;
	targetPanRowId: string;
	nameSource: Track1Source;
	targetNameRowId: string;
}

export const initialState: Track1State = {
	panSource: 'random',
	targetPanRowId: '',
	nameSource: 'random',
	targetNameRowId: ''
};

export const defaultGenerationOptions = initialState;

export type GenerationOptionsType = Track1State;

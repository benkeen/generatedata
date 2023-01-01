export type Track2Source = 'row' | 'random';

export type Track2State = {
	panSource: Track2Source;
	targetPanRowId: string;
}

export const initialState: Track2State = {
	panSource: 'random',
	targetPanRowId: '',
};

export const defaultGenerationOptions = initialState;

export type GenerationOptionsType = Track2State;

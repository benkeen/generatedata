export type TextSource = 'lipsum' | 'custom';

export type TextRandomState = {
	fromStart: boolean;
	minWords: number;
	maxWords: number;
	textSource: TextSource;
	customText: string;
};

export type GenerationOptionsType = {
	fromStart: boolean;
	minWords: number;
	maxWords: number;
	words: string[];
}

export const initialState: TextRandomState = {
	fromStart: false,
	minWords: 1,
	maxWords: 10,
	textSource: 'lipsum',
	customText: ''
};

export const defaultGenerationOptions = initialState;

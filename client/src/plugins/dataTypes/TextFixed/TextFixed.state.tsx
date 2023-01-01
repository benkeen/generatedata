export type TextSource = 'lipsum' | 'custom';

export type TextFixedState = {
	numWords: number;
	textSource: TextSource;
	customText: string;
};

export type GenerationOptionsType = {
	words: string[];
	numWordsToGenerate: number;
}

export const initialState: TextFixedState = {
	numWords: 10,
	textSource: 'lipsum',
	customText: ''
};

export const defaultGenerationOptions = initialState;

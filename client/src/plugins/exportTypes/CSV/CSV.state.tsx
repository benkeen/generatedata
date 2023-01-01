export type CSVSettings = {
	delimiter: string;
	lineEndings: 'Windows' | 'Unix' | 'Mac';
};

export const initialState: CSVSettings = {
	delimiter: ',',
	lineEndings: 'Unix'
};

export const defaultGenerationOptions = initialState;

export type GenerationOptionsType = CSVSettings;

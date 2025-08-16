export type GenerationOptionsType = {
	value: string;
};

export const defaultGenerationOptions: GenerationOptionsType = {
	value: 'LLLxxLLLxLL'
};

export type AlphanumericState = {
	example: string;
	value: string;
};

export const initialState: AlphanumericState = {
	example: 'LLLxxLLLxLL',
	...defaultGenerationOptions
};

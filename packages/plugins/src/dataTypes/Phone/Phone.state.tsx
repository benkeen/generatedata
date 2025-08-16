export type PhoneState = {
	example: string;
	option: string[];
};

export type GenerationOptionsType = {
	option: string[];
};

export const defaultGenerationOptions: GenerationOptionsType = {
	option: ['1-Xxx-Xxx-xxxx', '(Xxx) Xxx-xxxx']
};

export const initialState: PhoneState = {
	example: '1-Xxx-Xxx-xxxx|(Xxx) Xxx-xxxx',
	...defaultGenerationOptions
};

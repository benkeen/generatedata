type SiretState = {
	example: string;
	option: string;
};

export type GenerationOptions = {
	option: string;
};

export const defaultGenerationOptions: GenerationOptions = {
	option: ''
};

export const initialState: SiretState = {
	example: '',
	...defaultGenerationOptions
};

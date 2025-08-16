export type GenerationOptionsType = {
	values: string[];
};

export type BooleanState = {
	example: string;
	values: string[];
};

export const defaultGenerationOptions = {
	values: ['Yes', 'No']
};

export const initialState: BooleanState = {
	example: 'Yes|No',
	...defaultGenerationOptions
};

export type GenerationOptionsType = {
	loopCount: number;
	values: any[];
};

export type ConstantState = {
	loopCount: number;
	values: string[];
};

export const initialState: ConstantState = {
	loopCount: 2,
	values: ['1', '2']
};

export const defaultGenerationOptions = initialState;

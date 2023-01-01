export type NumberRangeState = {
	min: number;
	max: number;
};

export const initialState: NumberRangeState = {
	min: 0,
	max: 10
};

export const defaultGenerationOptions = initialState;

export type GenerationOptionsType = {
	min?: number;
	max?: number;
}

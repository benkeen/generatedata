export type NormalDistributionState = {
	mean: number;
	sigma: number;
	precision: number;
};

export type GenerationOptionsType = NormalDistributionState;

export const initialState: NormalDistributionState = {
	mean: 0,
	sigma: 1,
	precision: 10
};

export const defaultGenerationOptions = initialState;

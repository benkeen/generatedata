export type GenerationOptionsType = {
	incrementStart: number;
	incrementValue: number;
	incrementPlaceholder?: string;
}

export const defaultGenerationOptions: GenerationOptionsType = {
	incrementStart: 1,
	incrementValue: 1,
	incrementPlaceholder: ''
};

export type AutoIncrementState = {
	example: string;
	incrementStart: string;
	incrementValue: string;
	incrementPlaceholder: string;
}

export const initialState: AutoIncrementState = {
	example: '1,1',
	incrementStart: '1',
	incrementValue: '1',
	incrementPlaceholder: ''
};

export const enum ColourFormat {
	hex = 'hex',
	rgb = 'rgb',
	rgba = 'rgba'
}

export const enum LuminosityType {
	any = 'any',
	bright = 'bright',
	light = 'light',
	dark = 'dark'
}

export type ColourState = {
	example: string;
	value: string;
	luminosity: LuminosityType;
	format: ColourFormat;
	alpha: number;
};

export type GenerationOptionsType = Omit<ColourState, 'example'>

export const defaultGenerationOptions: GenerationOptionsType = {
	value: 'any',
	luminosity: LuminosityType.any,
	format: ColourFormat.hex,
	alpha: 1
};

export const initialState: ColourState = {
	example: 'any',
	...defaultGenerationOptions
};

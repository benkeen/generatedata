export const enum ColourFormatEnum {
	hex = 'hex',
	rgb = 'rgb',
	rgba = 'rgba'
}
export type ColourFormat = `${ColourFormatEnum}`;

export const enum LuminosityTypeEnum {
	any = 'any',
	bright = 'bright',
	light = 'light',
	dark = 'dark'
}
export type LuminosityType = `${LuminosityTypeEnum}`;

export type ColourState = {
	example: string;
	value: string;
	format: ColourFormat;
	luminosity: LuminosityType;
	alpha: number;
};

export type GenerationOptionsType = {
	value: string;
	format: ColourFormat;
	luminosity?: LuminosityType;
	alpha?: number;
}

export const defaultGenerationOptions: ColourState = {
	example: 'any',
	value: 'any',
	luminosity: 'any',
	format: 'hex',
	alpha: 1
};

export const initialState: ColourState = {
	...defaultGenerationOptions
};

export type ColourFormat = 'hex' | 'rgb' | 'rgba';

export type LuminosityType = 'any' | 'bright' | 'light' | 'dark';

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
};

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

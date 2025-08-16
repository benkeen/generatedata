export type FormatCode = '12345678-9' | '12.345.678-9' | '123456789' | '12.345.678-9' | '12345678' | '12.345.678' | '9';

export type RutState = {
	example: string;
	formatCode: FormatCode;
	uppercaseDigit: boolean;
};

export type GenerationOptionsType = Omit<RutState, 'example'>;

export const defaultGenerationOptions = {
	formatCode: '12345678-9' as FormatCode,
	uppercaseDigit: true
};

export const initialState: RutState = {
	example: '',
	...defaultGenerationOptions
};

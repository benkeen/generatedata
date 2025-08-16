export enum PrefixLocationEnum {
	prefix = 'prefix',
	suffix = 'suffix'
}
export type PrefixLocation = `${PrefixLocationEnum}`;

export type GenerationOptionsType = {
	from: number;
	to: number;
	currencySymbol: string;
	currencySymbolLocation: PrefixLocation;
	includeCents: boolean;
	thousandsSeparator: string;
	centsSeparator: string;
}

export const defaultGenerationOptions = {
	from: '0.00',
	to: '100.00',
	currencySymbol: '$',
	currencySymbolLocation: PrefixLocationEnum.prefix,
	includeCents: true,
	thousandsSeparator: ',',
	centsSeparator: '.'
};

export const initialState = {
	example: '0.00|100.00|$|prefix|true|,|.',
	...defaultGenerationOptions
};

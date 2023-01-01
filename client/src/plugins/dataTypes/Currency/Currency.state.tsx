export enum PrefixLocation {
	prefix = 'prefix',
	suffix = 'suffix'
}

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
	currencySymbolLocation: PrefixLocation.prefix,
	includeCents: true,
	thousandsSeparator: ',',
	centsSeparator: '.'
};

export const initialState = {
	example: '0.00|100.00|$|prefix|true|,|.',
	...defaultGenerationOptions
};

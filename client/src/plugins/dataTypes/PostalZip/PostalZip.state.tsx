import { DataTypeFolder } from '../../../../_plugins';

export const enum PostalZipSourceEnum {
	any = 'any',
	countries = 'countries',
	countryRow = 'countryRow',
	regionRow = 'regionRow'
}
export type PostalZipSource = `${PostalZipSourceEnum}`;

export type PostalZipState = {
	source: PostalZipSource;
	selectedCountries: DataTypeFolder[];
	targetRowId: string;
};

export const initialState: PostalZipState = {
	source: PostalZipSourceEnum.any,
	selectedCountries: [],
	targetRowId: ''
};

export const defaultGenerationOptions = initialState;

export type PostalZipStateAny = {
	source: 'any' | PostalZipSourceEnum.any;
};

export type PostalZipStateCountries = {
	source: 'countries' | PostalZipSourceEnum.countries;
	selectedCountries: DataTypeFolder[];
};

export type PostalZipStateDataRow = {
	source: PostalZipSourceEnum.countryRow | PostalZipSourceEnum.regionRow;
	targetRowId: string;
}

export type GenerationOptionsType = PostalZipStateAny | PostalZipStateCountries | PostalZipStateDataRow;

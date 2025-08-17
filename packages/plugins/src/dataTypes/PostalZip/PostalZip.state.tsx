import { CountryType } from '../../';

export const enum PostalZipSourceEnum {
  any = 'any',
  countries = 'countries',
  countryRow = 'countryRow',
  regionRow = 'regionRow'
}
export type PostalZipSource = `${PostalZipSourceEnum}`;

export type PostalZipState = {
  source: PostalZipSource;
  selectedCountries: CountryType[];
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
  selectedCountries: CountryType[];
};

export type PostalZipStateDataRow = {
  source: PostalZipSourceEnum.countryRow | PostalZipSourceEnum.regionRow | 'countryRow' | 'regionRow';
  targetRowId: string;
};

export type GenerationOptionsType = PostalZipStateAny | PostalZipStateCountries | PostalZipStateDataRow;

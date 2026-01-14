import { CountryType } from '../../';

export type PostalZipSource = 'any' | 'countries' | 'countryRow' | 'regionRow';

export type PostalZipState = {
  source: PostalZipSource;
  selectedCountries: CountryType[];
  targetRowId: string;
};

export const initialState: PostalZipState = {
  source: 'any',
  selectedCountries: [],
  targetRowId: ''
};

export const defaultGenerationOptions = initialState;

export type PostalZipStateAny = {
  source: 'any';
};

export type PostalZipStateCountries = {
  source: 'countries';
  selectedCountries: CountryType[];
};

export type PostalZipStateDataRow = {
  source: 'countryRow' | 'regionRow';
  targetRowId: string;
};

export type GenerationOptionsType = PostalZipStateAny | PostalZipStateCountries | PostalZipStateDataRow;

import { countries } from '../_plugins';

export type countryTuple = typeof countries;
export type CountryType = countryTuple[number];
export type CountryNamesMap = {
  [country in CountryType]?: CountryNames;
};

export type CountryMap = {
  [country in CountryType]?: string;
};

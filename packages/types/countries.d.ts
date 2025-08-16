export interface GetCountryData {
  (i18n: any): CountryDataType;
}

export type CountryDataType = {
  countrySlug: string;
  countryName: string;
  regionNames: string;
  continent: Continent;
  regions: Region[];
  extendedData: ExtendedData;
};

export type CountryNames = {
  femaleNames: string[];
  maleNames: string[];
  lastNames: string[];
};

export type Continent = 'africa' | 'asia' | 'central_america' | 'europe' | 'oceania' | 'south_america' | 'north_america';

export type ExtendedData = {
  zipFormat: {
    format: string;
    replacements?: any;
  };
  phoneFormat?: {
    areaCodes?: number[] | string[];
    displayFormats?: string[];
  };
};

export type Region = {
  regionName: string;
  regionShort: string;
  regionSlug: string;
  weight: number;
  cities: string[];
  extendedData?: ExtendedData;
};

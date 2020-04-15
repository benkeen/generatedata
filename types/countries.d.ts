export type CountryType = {
	countrySlug: string;
	countryName: string;
	regionNames: string;
	continent: Continent;
	extendedData: any;
	regions: Region[];
};

export type Continent = 'oceania';

export type Region = {
	regionName: string;
	regionShort: string;
	regionSlug: string;
	weight: number;
	cities: string[];
};

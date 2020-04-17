export type CountryType = {
	countrySlug: string;
	countryName: string;
	regionNames: string;
	continent: Continent;
	extendedData: {
		zipFormat?: {
			format: string;
			replacements?: any;
		},
		phoneFormat?: {
			displayFormats: string[]
		}
	};
	regions: Region[];
};

export type Continent = 'oceania' | 'europe';

export type Region = {
	regionName: string;
	regionShort: string;
	regionSlug: string;
	weight: number;
	cities: string[];
};

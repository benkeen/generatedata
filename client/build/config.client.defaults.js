/**
 * REMOVE THIS FILE.
 */
export default {
	defaultNumRows: 100,
	maxDemoModeRows: 100,
	maxDataSetHistorySize: 200,
	defaultLocale: 'en',
	defaultExportType: 'JSON', // has to map to the Export Type folder name
	defaultCountryPlugins: [],
	apiEnabled: false,

	// blacklists specific data types from being included in the generated application - they're handy for work-in-progress
	// or if you simply have no use for them
	dataTypeBlacklist: [
		'_NamesRegional',
		'_PhoneRegional',

		// incomplete - will be removed from here when they're done
		'OrganizationNumber',
		'PAN',
		'PersonalNumber',
		'SIRET',
		'Track1',
		'Track2'
	],

	exportTypeBlacklist: [],

	countryBlacklist: [],

	dataTypeGroups: [
		'humanData',
		'geo',
		'text',
		'numeric',
		'other',
		'financial',
		'countrySpecific'
	],

	continents: [
		'africa',
		'asia',
		'centralAmerica',
		'europe',
		'northAmerica',
		'oceania',
		'southAmerica'
	],

	locales: [
		'ar', 'de', 'en', 'es', 'fr', 'ja', 'nl', 'ta', 'zh'
	],

	importFiles: []
};

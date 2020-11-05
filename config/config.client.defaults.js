/**
 * This contains the default settings for the Data Generator. The installation script will lead you through the
 * steps to create a config.js file in the root (one folder above the dist/ webroot so never publicly accessible)
 * and that'll contain the necessary overrides like DB settings. But this setting contains every one that can
 * be overwritten by the script.
 */
export default {
	isInDemoMode: false,
	encryptionSalt: '',
	errorReporting: '',
	maxGeneratedRows: 100000,
	defaultNumRows: 100,
	maxDemoModeRows: 100,
	maxDataSetHistorySize: 200,
	defaultLocale: 'en',
	defaultExportType: 'JSON', // has to map to the Export Type folder name
	defaultCountryPlugins: [],
	useMinifiedResources: false,
	timeout: 300, // 5 minutes
	apiEnabled: false,

	// blacklists specific data types from being included in the generated application - they're handy for work-in-progress
	// or if you simply have no use for them
	dataTypeBlacklist: [
		'_NamesRegional',
		'_PhoneRegional',
		'_Tree',

		// incomplete - will be removed when they're done
		'Currency',
		'CVV',
		'NormalDistribution',
		'OrganizationNumber',
		'PAN',
		'PersonalNumber',
		'PIN',
		'Rut',
		'SIRET',
		'Track1',
		'Track2'
	],

	exportTypeBlacklist: [
		'CSV',
		'Excel',
		'LDIF'
	],

	countryBlacklist: [],

	// importSqlFeatureEnabled: true,
	// importSqlListDatabases: false,

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

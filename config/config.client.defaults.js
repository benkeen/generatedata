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
	// importSqlFeatureEnabled: true,
	// importSqlListDatabases: false,

	dataTypeGroups: [
		'humanData',
		'geo',
		'creditCardData',
		'text',
		'numeric',
		'math',
		'other'
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
		'de', 'en', 'es', 'fr', 'ja', 'nl', 'ta', 'zh'
	],

	// controls the top-level tabs seen in the application.
	tabs: [
		{
			id: 'generate',
			label: 'Generate',
			file: '...'
		},
		{
			id: 'about',
			label: 'About',
			file: '...'
		},
		{
			id: 'accounts',
			label: 'Accounts',
			requiresAuth: true
		},
		{
			id: 'settings',
			label: 'Settings',
			requiresAuth: true
		}
	],

	// custom settings that plugins may want to add. Just call core.getPluginSettings() to get them in your plugin
	pluginSettings: {}
};

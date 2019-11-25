export const config = {

	// overridable settings
	isInDemoMode: false,
	dbHostname: '',
	dbName: '',
	dbUsername: '',
	dbPassword: '',
	dbTablePrefix: 'gd_',
	encryptionSalt: '',
	errorReporting: '',
	maxGeneratedRows: 100000,
	defaultNumRows: 100,
	maxDemoModeRows: 100,
	maxDataSetHistorySize: 200,
	defaultLanguageFile: 'en',
	defaultExportType: "HTML",
	defaultCountryPlugins: [],
	defaultTheme: "classic",
	enableSmartySecurity: true,
	useMinifiedResources: false,
	pluginSettings: [],
	timeout: 300, // 5 minutes
	apiEnabled: false,
	importSqlFeatureEnabled: true,
	importSqlListDatabases: false,

	// non-overridable settings - move these elsewhere
	releaseDate: "2019-11-16",
	minimumPHPVersion: "5.3.0",
	minimumMySQLVersion: "4.1.3",
	settingsFileExists: false,
	dataTypeGroups: [
		"human_data", "geo", "credit_card_data", "text", "numeric", "math", "other"
	],
	continents: ["africa", "asia", "central_america", "europe", "north_america", "oceania", "south_america"],

	locales: [
		'en', 'fr', 'de', 'es', 'ja', 'nl', 'ta'
	],

	// controls the top-level tabs seen in the application
	tabs: [
		{
			id: 'generate',
			label: 'Generate', // TODO move to locale string
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
	]
};

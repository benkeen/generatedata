export default {
	// any time we roll out backward incompatible redux structure changes, this number should be bumped. It causes
	// anyone's setup to automatically reset & forget any previous saved redux store structure so there aren't
	// incompatibility problems with the latest code
	APP_STATE_VERSION: 8,

	NUM_DEFAULT_ROWS: 4,
	GITHUB_URL: 'https://github.com/benkeen/generatedata',
	CHANGELOG_URL: 'https://github.com/benkeen/generatedata/blob/master/CHANGELOG.md',

	// these map to the GD_APP_TYPE env var. They're the different available configurations for this GD installation
	APP_TYPES: {
		LOGIN: 'login',
		SINGLE: 'single',
		OPEN: 'open',
		CLOSED: 'closed'
	},

	THEMES: [
		{ value: 'ambiance', label: 'Ambiance' },
		{ value: 'cobalt', label: 'Cobalt' },
		{ value: 'darcula', label: 'Darcula' },
		{ value: 'lucario', label: 'Lucario' }
	],
	MIN_PREVIEW_ROWS: 5,
	MAX_PREVIEW_ROWS: 20,
	HEADER_HEIGHT: 66,
	FOOTER_HEIGHT: 66,
	SMALL_SCREEN_WIDTH: 600,
	GENERATION_BATCH_SIZE: 50,

	GRID: {
		SMALL_BREAKPOINT: 650,
		MEDIUM_BREAKPOINT: 780
	},

	ACTIVITY_PANEL_ACTIONS: {
		GENERATE: 'GENERATE',
		PAUSE: 'PAUSE',
		CONTINUE: 'CONTINUE',
		CHANGE_SPEED: 'CHANGE_SPEED',
		ABORT: 'ABORT',
		SET_LAG: 'SET_LAG'
	},

	ZINDEXES: {
		DRAWER: 1300,
		DIALOG: 5005
	},

	DATA_TYPE_GROUPS: [
		'humanData',
		'geo',
		'text',
		'numeric',
		'other',
		'financial',
		'countrySpecific'
	],

	EXPORT_TYPE_GROUPS: [
		'core',
		'programmingLanguage'
	],

	CONTINENTS: [
		'africa',
		'asia',
		'centralAmerica',
		'europe',
		'northAmerica',
		'oceania',
		'southAmerica'
	]
};

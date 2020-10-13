export default {
	// any time we roll out backward incompatible redux structure changes, this number should be bumped. It causes
	// anyone's setup to automatically reset & forget any previous saved redux store structure so there aren't
	// problems
	APP_STATE_VERSION: 2,

	NUM_DEFAULT_ROWS: 5,
	GITHUB_URL: 'https://github.com/benkeen/generatedata',
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

	ACTIVITY_PANEL_ACTIONS: {
		GENERATE: 'GENERATE',
		PAUSE: 'PAUSE',
		CONTINUE: 'CONTINUE',
		ABORT: 'ABORT',
		SET_LAG: 'SET_LAG'
	},

	ZINDEXES: {
		DRAWER: 1300,
		DIALOG: 5005
	}
};

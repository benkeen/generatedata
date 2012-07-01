/**
 * Contains all constants used by the script.
 */
define([], function() {

	var CONSTANTS = {

		/**
		 * Contains various options for debugging.
		 */
		DEBUGGING: {
			CONSOLE_LOG: true,
			LIST_PUBLISH_EVENTS: true,
			LIST_SUBSCRIBE_EVENTS: true
		},

		/**
		 * List of component types.
		 */
		COMPONENT: {
			DATA_TYPE: 'data-type',
			EXPORT_TYPE: 'export-type',
			//COUNTRIES: 'countries',
			CORE: 'core'
		},

		EXPORT_TYPE_SETTINGS_BLIND_SPEED: 500,

		/**
		 * Contains all Core events.
		 */
		EVENT: {
			RESULT_TYPE: {
				CHANGE: "event-result-type-change"
			},
			COUNTRIES: {
				CHANGE: "event-countries-change"
			},
			DATA_TYPE: {
				CHANGE: "event-data-type-change"
			},
			DATA_TABLE: {
				ONLOAD_READY: "event-data-table-onload-ready",
				ROW: {
					CHECK_TO_DELETE: "event-data-table-check-row-to-delete",
					UNCHECK_TO_DELETE: "event-data-table-uncheck-row-to-delete",
					DELETE: "event-data-table-row-delete",
					ADD: "event-data-table-row-add",
					SORT: "event-data-table-row-sort"
				},
				CLEAR: "event-data-table-clear",
			},
			GENERATE: "event-generate",
			IO: {
				SAVE: "event-io-save",
				LOAD: "event-io-load"
			},
			USER: {
				LOGIN: "event-user-login",
				LOGOUT: "event-user-logout"
			},
			TAB: {
				CHANGE: "event-tab-change"
			},
			LANGUAGE: {
				CHANGE: "event-language-change"
			},
			MODULE: {
				REGISTER: "event-module-register",
				UNREGISTER: "event-module-unregister",

				READY: "" // ... INIT? RUN?
			}
		}
	}

	return CONSTANTS;
});

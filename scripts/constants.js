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
			LIST_SUBSCRIBE_EVENTS: true,
			LIST_MODULE_REGISTRATIONS: true
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
					MARK_TO_DELETE: "event-data-table-mark-row-to-delete",
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
			}
		}
	}

	return CONSTANTS;
});

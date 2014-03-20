<?php
require_once(realpath(dirname(__FILE__) . "/../../library.php"));
Core::init();

header("Cache-control: private");
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
header("Content-type: application/x-javascript");
?>
/**
 * Constants used by the client-side code.
 */
define([], function() {

	var CONSTANTS = {

		/**
		 * Contains various options for debugging.
		 */
		DEBUGGING: {
			CONSOLE_WARN: <?php Settings::safeDisplaySetting("consoleWarnings"); ?>,
			LIST_PUBLISH_EVENTS: <?php Settings::safeDisplaySetting("consoleEventsPublish"); ?>,
			LIST_SUBSCRIBE_EVENTS: <?php Settings::safeDisplaySetting("consoleEventsSubscribe"); ?>,
			LIST_CORE_EVENTS: <?php Settings::safeDisplaySetting("consoleCoreEvents"); ?>,
			LIMIT_DATA_TYPE_EVENTS: "<?php Settings::safeDisplaySetting("consoleEventsDataTypePlugins") ?>",
			LIMIT_EXPORT_TYPE_EVENTS: "<?php Settings::safeDisplaySetting("consoleEventsExportTypePlugins") ?>"
		},

		SETTINGS: {
			ANON_USER_PERMISSION_DENIED_MSG: "<?php Settings::safeDisplaySetting("anonymousUserPermissionDeniedMsg"); ?>"
		},

		/**
		 * List of component types.
		 */
		COMPONENT: {
			DATA_TYPE: 'data-type',
			EXPORT_TYPE: 'export-type',
			CORE: 'core'
		},

		EXPORT_TYPE_SETTINGS_BLIND_SPEED: 500,

		GENERATE_IN_PAGE_BATCH_SIZE: 100,

		MAX_GENERATED_ROWS: <?php echo Core::getMaxGeneratedRows(); ?>,

		DEMO_MODE: <?php echo Core::checkDemoMode(); ?>,

		THEME: "<?php Settings::safeDisplaySetting("theme") ?>",

		/**
		 * Contains all Core events.
		 */
		EVENT: {
            APP_START: 'app-start',
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
					TYPE_CHANGE: 'event-data-table-row-type-change',
					EXAMPLE_CHANGE: 'event-data-table-row-example-change',
					DELETE: "event-data-table-row-delete",
					ADD: "event-data-table-row-add",
					RE_SORT: "event-data-table-row-sort",
					HELP_DIALOG_OPEN: "event-data-table-help-dialog-open",
					HELP_DIALOG_CLOSE: "event-data-table-help-dialog-close"
				},
				CLEAR: "event-data-table-clear"
			},
			GENERATE: "event-generate",
			IO: {
				SAVE: "event-io-save",
				LOAD: "event-io-load"
			},
			TAB: {
				CHANGE: "event-tab-change"
			},
			MODULE: {
				REGISTER: "event-module-register",
				UNREGISTER: "event-module-unregister"
			},
			ACCOUNT: {
				LOGGED_IN: "event-account-logged-in",
				AVAILABLE: "event-account-available"
			}
		},

		ERROR_CODES: {
			ACCOUNT_ALREADY_EXISTS: <?php echo ErrorCodes::ACCOUNT_ALREADY_EXISTS; ?>,
			NOT_LOGGED_IN: <?php echo ErrorCodes::NOT_LOGGED_IN ?>,
			NON_ADMIN: <?php echo ErrorCodes::NON_ADMIN ?>
		}
	}

	return CONSTANTS;
});

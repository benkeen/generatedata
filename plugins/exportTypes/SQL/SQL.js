"use strict";

define([
	"constants",
	"lang",
	"manager"
], function(C, L, manager) {

	var MODULE_ID = "export-type-SQL";
	var LANG = L.exportTypePlugins.SQL;


	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		manager.subscribe(MODULE_ID, subscriptions);
	}


	/**
	 * Called when the user changes the result type
	 */
	var _resultTypeChanged = function(msg) {
		if (msg.newExportType == "SQL") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	}

	/**
	 * If the user is generating in-page data with this Export Type, enable the XML
	 * mode for the in-page editor. Since Oracle and SQLite don't have their own CodeMirror modes yet,
	 * we just re-use MySQL for all of them: they're pretty similar, anyway.
	 */
	var _onGenerate = function(msg) {
		if (msg.exportTarget != "inPage" || msg.exportType != "SQL") {
			return;
		}
		msg.editor.setOption("mode", "mysql");
	}

	manager.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init
	});
});
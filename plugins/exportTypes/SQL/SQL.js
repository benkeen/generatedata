/*global $:false*/
define([
	"manager",
	"generator",
	"constants",
	"lang"
], function(manager, generator, C, L) {

	"use strict";

	/**
	 * @name SQL
	 * @see ExportType
	 * @description Client-side code for the SQL Export Type.
	 * @namespace
	 */
	var MODULE_ID = "export-type-SQL";
	var LANG = L.exportTypePlugins.SQL;


	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		manager.subscribe(MODULE_ID, subscriptions);
	};


	/**
	 * Called when the user changes the result type
	 */
	var _resultTypeChanged = function(msg) {
		if (msg.newExportType == "SQL") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	};

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
	};

	var _validate = function(rowNums) {
		var errors = [];

		// first, check the Table Column names that have been entered are valid
		var errorFields = [];
		var errorFieldVisibleRowNums = [];
		var validTableCol = new RegExp("^[a-zA-Z][0-9a-zA-Z_$]*");
		for (var i=0; i<rowNums.length; rowNums++) {
			var tableColField = $("#gdTitle_" + rowNums[i]);
			var tableColFieldVal = tableColField.val();

			// we don't bother throwing an error if the field is empty, because that's caught by the Core script
			if (tableColFieldVal !== "" && !validTableCol.test(tableColField.val())) {
				errorFields.push(tableColField);
				errorFieldVisibleRowNums.push(generator.getVisibleRowOrderByRowNum(rowNums[i]));
			}
		}

		if (errorFields.length) {
			errors.push({
				els: errorFields,
				error: LANG.validation_invalid_col_name + "<b>" + errorFieldVisibleRowNums.join(", ") + "</b>"
			});
		}

		// secondly, check the SQL fields have all been entered properly
		var tableNameField = $("#etSQL_tableName");
		var tableNameFieldVal = $.trim(tableNameField.val());
		var validTableName = new RegExp("^[a-zA-Z_][0-9a-zA-Z_$]*");
		if (tableNameFieldVal === "" || !validTableName.test(tableNameFieldVal)) {
			errors.push({
				els: tableNameField,
				error: LANG.validation_invalid_table_name
			});
		}

		return errors;
	};

	var _loadSettings = function(settings) {

	};

	var _saveSettings = function() {

	};

	manager.registerExportType(MODULE_ID, {

		/*
		 * @function
		 * @name SQL#init
		 */
		init: _init,

		/**
		 * The SQL validation function checks that all table columns are a-Z, 0-9 and that all custom SQL
		 * settings are filled in properly. For simplicity, this function doesn't do anything terribly smart
		 * in terms of the table name and column name validation: it doesn't do custom validation against the
		 * selected database type or against reserved words. Would be good to add...!
		 * @function
		 * @name SQL#validate
		 */
		validate: _validate,
		loadSettings: _loadSettings,
		saveSettings: _saveSettings
	});

});
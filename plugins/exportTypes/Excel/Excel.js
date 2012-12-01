/*global $:false,CodeMirror:false*/
 define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name Excel
	 * @see ExportType
	 * @description Client-side code for the Excel Export Type.
	 * @namespace
	 */

	var MODULE_ID = "export-type-Excel";
	var LANG = L.exportTypePlugins.Excel;


	var _loadSettings = function(settings) {
		// $("#etCSV_delimiter").val(settings.delimiter);
		// $("#etCSV_lineEndings").val(settings.eol);
	};

	var _saveSettings = function() {
		// return {
		// 	"delimiter": $("#etCSV_delimiter").val(),
		// 	"eol": $("#etCSV_lineEndings").val()
		// };
	};
	
	var _validate = function() {
		/*if ($("#csv_delimiter").val() == "") {
			Generator.errors.push({ els: [$("#csv_delimiter")], error: L.no_csv_delimiter });
		}*/
	};

	var _validate = function() {

	};

	manager.registerExportType(MODULE_ID, {
		validate: _validate,
		loadSettings: _loadSettings,
		saveSettings: _saveSettings
	});
});

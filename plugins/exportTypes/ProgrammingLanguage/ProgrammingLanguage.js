/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name ProgrammingLanguage
	 * @see ExportType
	 * @description Client-side code for the Programming Language Export Type.
	 * @namespace
	 */

	var MODULE_ID = "export-type-ProgrammingLanguage";
	var LANG = L.exportTypePlugins.ProgrammingLanguage;


	/**
	 * If the user is generating in-page data with this Export Type, enable the javascript
	 * mode for the in-page editor.
	 */
	var _onGenerate = function(msg) {
		if (msg.exportTarget != "inPage" || msg.exportType != "ProgrammingLanguage") {
			return;
		}

		switch ($("#etProgrammingLanguage_language")[0].value) {
			case "JavaScript":
				msg.editor.setOption("mode", "javascript");
				break;
			case "Perl":
				msg.editor.setOption("mode", "perl");
				break;
			case "PHP":
				msg.editor.setOption("mode", "php");
				break;
			case "Ruby":
				msg.editor.setOption("mode", "ruby");
				break;
		}
	};

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _loadSettings = function(settings) {
		$("#etProgrammingLanguage_language").val(settings.language);
	};

	var _saveSettings = function() {
		return {
			language: $("#etProgrammingLanguage_language").val()
		};
	};

	var _resetSettings = function() {
		$("#etProgrammingLanguage_language").val("JavaScript");
	};

	/**
	 * Called when the user changes the result type
	 */
	var _resultTypeChanged = function(msg) {
		if (msg.newExportType == "ProgrammingLanguage") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	};

	manager.registerExportType(MODULE_ID, {
		init: _init,
		loadSettings: _loadSettings,
		saveSettings: _saveSettings,
		resetSettings: _resetSettings
	});

});
/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name JSON
	 * @see ExportType
	 * @description Client-side code for the JSON Export Type.
	 * @namespace
	 */

	var MODULE_ID = "export-type-JSON";
	var LANG = L.exportTypePlugins.JSON;

	/**
	 * If the user is generating in-page data with this Export Type, enable the javascript
	 * mode for the in-page editor.
	 */
	var _onGenerate = function(msg) {
		if (msg.exportTarget !== "inPage" || msg.exportType !== "JSON") {
			return;
		}
		msg.editor.setOption("mode", "javascript");

		var wrapLines = ($("#etJSON_stripWhitespace")[0].checked);
		msg.editor.setOption("lineWrapping", wrapLines);
	};

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _loadSettings = function(settings) {
		if (settings.stripWhitespace === "1") {
			$("#etJSON_stripWhitespace").attr("checked", "checked");
		} else {
			$("#etJSON_stripWhitespace").removeAttr("checked");
		}

		// for backward compatibility with early alpha versions
		if (settings.hasOwnProperty("dataStructureFormat")) {
			$("input[name=etJSON_dataStructure][value=" + settings.dataStructureFormat + "]").attr("checked", "checked");
		}
	};

	var _saveSettings = function() {
		return {
			stripWhitespace: ($("#etJSON_stripWhitespace")[0].checked) ? 1 : 0,
			dataStructureFormat: $("#etJSON_dataStructureFormat").val()
		};
	};

	var _resetSettings = function() {
		$("#etJSON_stripWhitespace").removeAttr("checked");
	};

	manager.registerExportType(MODULE_ID, {
		init: _init,
		loadSettings: _loadSettings,
		saveSettings: _saveSettings,
		resetSettings: _resetSettings
	});
});
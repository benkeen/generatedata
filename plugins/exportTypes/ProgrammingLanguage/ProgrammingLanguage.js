"use strict";

define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

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

//		msg.editor.setOption("mode", "javascript");
//		var wrapLines = ($("#etJSON_stripWhitespace")[0].checked);
//		msg.editor.setOption("lineWrapping", wrapLines);
	}

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		manager.subscribe(MODULE_ID, subscriptions);
	}

	manager.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init
	});

});
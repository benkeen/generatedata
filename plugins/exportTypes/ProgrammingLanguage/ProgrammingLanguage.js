"use strict";

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
/*jslint browser:true*/
/*global $:false,console:false,define:false*/
define([
	"manager",
	"utils",
	"constants",
	"lang"
], function(manager, utils, C, L) {

	"use strict";

	/**
	 * @name Settings
	 * @see Core
	 * @description Handles all code for the interactivity on the settings page. Added in 3.2.2.
	 * @author Ben Keen
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-settings";

	var _run = function() {
		$(".gdToggleAll").on("change", _togglePluginRows);

    // form validation:
    // - at least 1 data type, export type + country
	};

  var _togglePluginRows = function (e) {
    $(e.target).closest(".gdPluginSection").find("li input").prop("checked", e.target.checked);
  };


	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});

	return {
		run: _run
	};
});

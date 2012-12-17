/*global $:false,CodeMirror:false,console:false */
define([
	"manager",
	"accountManager",
	"utils",
	"constants",
	"lang"
], function(manager, accountManager, utils, C, L) {

	"use strict";

	/**
	 * @name MainDialog
	 * @see Core
	 * @description This contains all the code for handling the main dialog.
	 * @author Ben Keen
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-mainDialog";





	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run,
		skipDomReady: false
	});

});

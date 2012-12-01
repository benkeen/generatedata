/*global $:false,CodeMirror:false,console:false */
define([
	"manager",
	"utils",
	"constants",
	"lang",
	"jquery-ui"
], function(manager, utils, C, L) {

	"use strict";

	/**
	 * @name Accounts
	 * @see Core
	 * @description This module is for managing user accounts - loading, updating, deleting. For loading and
	 * saving of data sets within an account (or for the global anonymous account) see io.js.
	 * @author Ben Keen <ben.keen@gmail.com>
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-accounts";


	var _run = function() {
		$("#gdAddAccount").on("click", _openAddAccountDialog);
	};


	var _openAddAccountDialog = function() {
		
	};

	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run,
		skipDomReady: false
	});

});
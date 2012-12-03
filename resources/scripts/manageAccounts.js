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
	 * @name ManageAccounts
	 * @see Core
	 * @description This module is loaded for the admin account in multiple user mode only. It contains the 
	 * code for managing user accounts - loading, updating, deleting. For loading and saving of data sets, 
	 * retrieving current account info, etc. see account.js.
	 * @author Ben Keen <ben.keen@gmail.com>
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-manageAccounts";


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
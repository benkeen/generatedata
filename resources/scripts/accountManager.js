/*jslint browser:true*/
/*global $:false,console:false,define:false*/
define([
	"manager",
	"utils",
	"constants",
	"lang",
	"moment"
], function(manager, utils, C, L, moment) {

	"use strict";

	/**
	 * @name AccountManager
	 * @see Core
	 * @description This contains all functionality for the administrator when in multiple accounts mode:
	 *   adding, deleting and editing user accounts.
	 * @author Ben Keen
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-accountManager";

	var _run = function() {
		$("#gdCreateAccount").on("click", _openCreateAccountDialog);
		$("#gdRefreshPassword").on("click", _regeneratePassword);
	};

	var _openCreateAccountDialog = function() {
		$("#gdManageAccount_pwdCreate").removeClass("hidden");
		$("#gdManageAccount_pwdEdit").addClass("hidden");
		_regeneratePassword();

		$("#gdManageAccountDialog").dialog({
			title: "Create Account",
			modal: true,
			width: 600,
			buttons: [
				{
					text: "Create Account",
					click: function() { 

					}
				},
				{
					text: L.close,
					click: function() { $(this).dialog("close"); }
				}
			]
		});
	};

	var _regeneratePassword = function() {
		$("#gdManageAccount_password").val(utils.generateRandomAlphaNumericStr(8));
	};

	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});
});
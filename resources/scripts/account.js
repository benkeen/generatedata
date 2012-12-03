/*global $:false,CodeMirror:false,console:false */
define([
	"manager",
	"utils",
	"constants",
	"lang",
	"jquery-ui"
], function(manager, utils, C, L) {

	"use strict";

	var _isLoaded = false;
	var _accountInfo = null;
	var _dataSets = null;


	/**
	 * @name Account
	 * @see Core
	 * @description This handles all functionality relating to a user account. It runs onload and 
	 * 
	 * @author Ben Keen <ben.keen@gmail.com>
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-account";


	var _run = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "JSON",
			data: {
				action: "getAccount"
			},
			success: _onRetrievingAccountInfo,
			error: _onError
		});
	};

	var _onRetrievingAccountInfo = function(response) {
		_isLoaded = true;
		_accountInfo = response.content;
		_dataSets = response.content.configurations;
	};

	var _onError = function(response) {
		console.log("on error");
		console.log(response);
	};

	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});

});
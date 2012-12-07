/*global $:false,console:false */
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
	var _dataSets = [];
	var _currConfigurationID = null;


	/**
	 * @name Account
	 * @see Core
	 * @description This handles all functionality relating to a user account, including saving
	 * and loading data sets.
	 * @author Ben Keen <ben.keen@gmail.com>
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-account";


	var _run = function() {
		_getDataSets();
	};

	var _getDataSets = function() {
		utils.startProcessing();
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
		utils.stopProcessing();

		// enable the save, load and link icons
		$("#gdActionIcons .loading").removeClass("loading");

		_isLoaded = true;
		_accountInfo = response.content;
		_dataSets = response.content.configurations;

		_displayDataSets();
	};

	var _displayDataSets = function() {
		var html = "";
		var row = "";
		var currDataSet;
		for (var i=0; i<_dataSets.length; i++) {
			currDataSet = _dataSets[i];
			row = '<tr data-id="' + currDataSet.configuration_id + '">' +
				'<td>' + currDataSet.configuration_name + '</td>' +
				'<td>' + currDataSet.date_created + '</td>' +
				'<td>' + currDataSet.last_updated + '</td>' +
				'<td>' + currDataSet.num_rows_generated + '</td>' +
				'<td align="center"><a href="#">load</a></td>' +
				'<td align="center"><input type="checkbox" name="gdDeleteDataSets" value="' + currDataSet.configuration_id + '"/></td>' +
				'</tr>';
			html += row;
		}
		$("#gdAccountDataSets tbody").html(html);
	};

	var _onError = function(response) {
		console.log("on error");
		console.log(response);
	};


	var _saveConfiguration = function(configuration) {
		utils.startProcessing();
		$.ajax({
			url:  "ajax.php",
			type: "POST",
			data: configuration,
			success: function(response) {
				if (response.success) {
					_currConfigurationID = response.content;
					_getDataSets();
				} else {
					// TODO
				}
			},

			error: function() {
				// alert(L.fatal_error);
				// gd.stopProcessing();
			}
		});
	};

	var _getConfiguration = function(configurationID) {
		var dataSet = {};
		for (var i=0; i<_dataSets.length; i++) {
			if (_dataSets[i].configuration_id != configurationID) {
				continue;
			}
			dataSet = _dataSets[i];
		}
		return dataSet;
	};

	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});


	// the public API
	return {
		getCurrConfigurationID: function() {
			return _currConfigurationID;
		},

		saveConfiguration: _saveConfiguration,

		getConfiguration: _getConfiguration
	};

});
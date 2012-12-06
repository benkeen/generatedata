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
		$("#gdAccountDataSets").on("click", "a", _loadDataSet);
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
				'<td>' + currDataSet.rows_generated + '</td>' +
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


	var _loadDataSet = function(e) {
		var configurationID = $(e.target).closest("tr").data("id");
		var dataSet = _getDataSetByConfigurationID(configurationID);
/*
		if (gd.queue.length) {
			alert(L.script_thinking);
			return false;
		}
*/

		utils.startProcessing();

		console.log(dataSet.content);

		var json = $.evalJSON(dataSet.content);
		console.log(json);

		return;
/*

		if (json.success == "true") {
			var info = json.form_content;

			var form_list = $("#formList")[0];
			for (var i=0; i<form_list.length; i++) {
				if (form_list[i].selected) {
					$("#saveFormName").val(form_list[i].text);
				}
			}

			// remove all the existing rows (except the heading row)
			gd.emptyForm(false, 0);

			$("#numResults").val(info.numResults);
			for (var i=0; i<document.data.resultType.length; i++) {
				if (document.data.resultType[i].value == info.resultType) {
					document.data.resultType[i].checked = true;
					gd.changeResultType(info.resultType);
					break;
				}
			}
			for (i=0; i<document.data["countryChoice[]"].length; i++) {
				if ($.inArray(document.data["countryChoice[]"][i].value, info.countries) != -1) {
					document.data["countryChoice[]"][i].checked = true;
				} else {
					document.data["countryChoice[]"][i].checked = false;
				}
			}
			gd.updateCountryChoice();

			// add the new blank rows
			gd.addRows(info.rowData.length);
			var rowOrder = gd._getRowOrder();

			// now populate the rows. Do everything that we can: create the rows, populate the titles & select
			// the data type. The remaining fields are custom to the data type, so we leave them to their
			// [ns].loadRow function (if defined)
			for (var i=0; i<rowOrder.length; i++) {
				var currRow = rowOrder[i];
				$("#title_" + currRow).val(info.rowData[i]["title"]); // decodeURIComponent
				$("#type_" + currRow).val(info.rowData[i]["dataType"]);
				gd.changeRowType("type_" + currRow, info.rowData[i]["dataType"]);

				var func_ns  = $("#type_" + currRow).val() + "_ns";
				if (typeof window[func_ns] === "object" && typeof window[func_ns].loadRow === "function") {
					gd.queue.push(window[func_ns].loadRow(currRow, info.rowData[i]));
				}
			}
			gd.processQueue();
		} else {
			gd.errors = [];
			gd.errors.push({ els: null, error: json.message });
			utils.displayValidationErrors("#gdMessages");
		}
		g.stopProcessing();
*/
	};

	var _saveConfiguration = function(configuration) {
		utils.startProcessing();
		$.ajax({
			url:  "ajax.php",
			type: "POST",
			data: configuration,
			success: function(response) {
				_getDataSets();
			},

			error: function() {
				// alert(L.fatal_error);
				// gd.stopProcessing();
			}
		});
	};

	var _getDataSetByConfigurationID = function(configurationID) {
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

		saveConfiguration: _saveConfiguration
	};

});
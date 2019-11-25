/*global $:false,define:false*/
define([
	"manager",
	"constants"
], function(manager, C) {

	"use strict";

	/**
	* @name Country
	* @description JS code for the Country Data Type.
	* @see DataType
	* @namespace
	*/

	var MODULE_ID = "data-type-Country";

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.COUNTRIES.CHANGE] = _countryChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {},
			isComplete: function() {
				var optionField = $("#dtOption_" + rowNum);
				if (optionField.length) {
					if (data.checked) {
						optionField.attr("checked", "checked");
					} else {
						optionField.removeAttr("checked");
					}
					return true;
				} else {
					return false;
				}
			}
		};
	};

	var _saveRow = function(rowNum) {
		return {
			"checked": ($("#dtOption_" + rowNum).attr("checked")) ? "checked" : ""
		};
	};

	/**
	 * This function has two convenient side-effects:
	 * 1. It runs on page load, so we don't need to do anything special.
	 * 2. It also affects the hidden template, so we don't need to do anything special for Country
	 *    Data Types that are selected in the future - they'll already have the appropriate DOM changes.
	 */
	var _countryChange = function(msg) {
		if (msg.countries.length > 0) {
			$(".dtCountry_allCountries").removeAttr("disabled");
			$(".dtCountry_allCountriesLabel").removeClass("gdDisabled");
		} else {
			$(".dtCountry_allCountries").attr("disabled", "disabled").removeAttr("checked");
			$(".dtCountry_allCountriesLabel").addClass("gdDisabled");
		}
	};


	// register our module
	manager.registerDataType(MODULE_ID, {
		init: _init,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});
/*global define:false,$:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {
	"use strict";

	var MODULE_ID = "data-type-PhoneRegional";
	var LANG = L.dataTypePlugins.PhoneRegional;
	var _currSelectedCountries = null;


	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.COUNTRIES.CHANGE] = _countryChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _saveRow = function(rowNum) {
		var data = {};
		for (var i=0; i<_currSelectedCountries.length; i++) {
			var el = $("#dtPhoneRegional_" + _currSelectedCountries[i] + "_" + rowNum);
			if (el.length) {
				data[_currSelectedCountries[i]] = el.val();
			}
		}

		// find the checkboxes in this row
		return data;
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				for (var countrySlug in data) {
					$("#dtPhoneRegional_" + countrySlug + "_" + rowNum).val(data[countrySlug]);
				}
			},
			isComplete: function() { return true; }
		}
	};

	/**
	 * This is called any time the country list changes - including on load. It ensures only the appropriate
	 * regions are displayed.
	 */
	var _countryChange = function(msg) {
		_currSelectedCountries = msg.countries;
		var shownClassesSelectors = [];
		for (var i=0; i<msg.countries.length; i++) {
			shownClassesSelectors.push(".dtPhoneRegionalCountry_" + msg.countries[i]);
		}
		var shownClassesSelector = shownClassesSelectors.join(",");
		$(".dtPhoneRegionalCountry").hide();
		$(shownClassesSelector).show();
	};

	manager.registerDataType(MODULE_ID, {
		init: _init,
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});

/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name Region
	 * @description JS code for the Region Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-Region";
	var LANG = L.dataTypePlugins.Region;
	var subscriptions = {};
	var _currSelectedCountries = null;

	var _init = function() {
		subscriptions[C.EVENT.COUNTRIES.CHANGE] = _countryChange;
		manager.subscribe(MODULE_ID, subscriptions);
		$("#gdTableRows").on("click", ".dtRegionCountry", _toggleCountryRegion);
	};

	var _saveRow = function(rowNum) {
		var shownClassesSelectors = [];
		for (var i=0; i<_currSelectedCountries.length; i++) {
			shownClassesSelectors.push(".dtRegionCountry_" + _currSelectedCountries[i]);
		}
		var shownClassesSelector = shownClassesSelectors.join(",");

		// find the checkboxes in this row
		var visible = $("#gdColOptions_" + rowNum).find(shownClassesSelector);
		var checked = [];
		for (var j=0; j<visible.length; j++) {
			if (visible[j].checked) {
				checked.push($(visible[j]).data("country"));
			}
		}
		return {
			"checked": checked
		};
	};

	var _loadRow = function(rowNum, data) {
		return [
			function() { },
			function() { return true; }
		];
	};

	/**
	 * This is called any time the country list changes - including on load. It ensures only the appropriate
	 * regions are displayed.
	 */
	var _countryChange = function(msg) {
		_currSelectedCountries = msg.countries;
		var shownClassesSelectors = [];
		for (var i=0; i<msg.countries.length; i++) {
			shownClassesSelectors.push(".dtRegionCountry_" + msg.countries[i] + ",.dtIncludeRegion_" + msg.countries[i]);
		}
		var shownClassesSelector = shownClassesSelectors.join(",");
		$(".dtRegionCountry").hide();
		$(shownClassesSelector).show();
	};

	var _validate = function() {

	};

	var _toggleCountryRegion = function(e) {
		var el = e.target;
		var parent = $(el).parent();
		if (el.checked) {
			parent.find("span input").removeAttr("disabled");
			parent.find("span label").addClass("dtRegionSuboptionActive").removeClass("dtRegionSuboptionInactive");
		} else {
			$(el).parent().find("span input").attr("disabled", "disabled");
			parent.find("span label").addClass("dtRegionSuboptionInactive").removeClass("dtRegionSuboptionActive");
		}
	};


	// register our module
	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});

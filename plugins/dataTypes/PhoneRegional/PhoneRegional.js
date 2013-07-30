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
		/*return {
			"example": $("#dtExample_" + rowNum).val(),
			"option":  $("#dtOption_" + rowNum).val()
		};*/
	};

	var _loadRow = function(rowNum, data) {
/*		return {
			execute: function() {
				$("#dtExample_" + rowNum).val(data.example);
				$("#dtOption_" + rowNum).val(data.option);
			},
			isComplete: function() { return $("#dtOption_" + rowNum).length > 0; }
		};*/
	};

	var _validate = function(rows) {
		/*var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			if ($("#dtOption_" + rows[i]).val() === "") {
				var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#dtOption_" + rows[i]));
			}
		}
		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
		*/
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
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});

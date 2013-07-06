/*global $:false,define:false*/
define([
	"manager",
	"constants"
], function(manager, C) {

	"use strict";

	/**
	 * @name Currency
	 * @description JS code for the Currency Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-Currency";

	var _init = function() {

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


	// register our module
	manager.registerDataType(MODULE_ID, {
		init: _init,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});
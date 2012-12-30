/*global $:false,define:false*/
define([
	"manager",
	"constants",
	"lang"
], function(manager, C, L) {

	"use strict";

	/**
	* @name Country
	* @description JS code for the Country Data Type.
	* @see DataType
	* @namespace
	*/

	var MODULE_ID = "data-type-Country";

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {},
			isComplete: function() {
				if ($("#dtOption_" + rowNum).length) {
					if (data.checked) {
						$("#dtOption_" + rowNum).attr("checked", "checked");
					} else {
						$("#dtOption_" + rowNum).removeAttr("checked");
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
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});
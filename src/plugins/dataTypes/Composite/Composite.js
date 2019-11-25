/*global $:false*/
define([
	"manager"
], function(manager) {

	"use strict";

	/**
	 * @name Composite
	 * @description JS code for the Composite Data Type.
	 * @see DataType
	 * @namespace
	 */

	/* @private */
	var MODULE_ID = "data-type-Composite";

	var _validate = function() {
		return [];
	};

	var _loadRow = function(rowNum, data) {
	  return {
			execute: function() {
				$("#dtOption_" + rowNum).val(data.option);
			},
			isComplete: function() {
			  return $("#dtOption_" + rowNum).length > 0;
			}
		};
	};

	var _saveRow = function(rowNum) {
		return {
			"option": $("#dtOption_" + rowNum).val()
		};
	};

	manager.registerDataType(MODULE_ID, {
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});


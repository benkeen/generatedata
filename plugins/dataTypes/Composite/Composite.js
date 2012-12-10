/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name Composite
	 * @description JS code for the Composite Data Type.
	 * @see DataType
	 * @namespace
	 */

	/* @private */
	var MODULE_ID = "data-type-Composite";
	var LANG = L.dataTypePlugins.Composite;

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			if ($("#dtOption_" + rows[i]).val() === "") {
				var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#option_" + rows[i]));
			}
		}

		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: L.AlphaNumeric_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}

		return errors;
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				$("#dtExample_" + rowNum).val(data.example);
				$("#dtOption_" + rowNum).val(data.option);
			},
			isComplete: function() { return $("#dtOption_" + rowNum).length > 0; }
		};
	};

	var _saveRow = function(rowNum) {
		return {
			"example":  $("#dtExample_" + rowNum).val(),
			"option":   $("#dtOption_" + rowNum).val()
		};
	};


	manager.registerDataType(MODULE_ID, {
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});


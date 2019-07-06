/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name Computed
	 * @description JS code for the Computed Data Type.
	 * @see DataType
	 * @namespace
	 */

	/* @private */
	var MODULE_ID = "data-type-Computed";
	var LANG = L.dataTypePlugins.Computed;

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
			  // 3.2.7 didn't properly include the JS for saving/loading. As such, it's possible that `data` is empty here.
        if (data) {
          $("#dtOption_" + rowNum).val(data.option);
        }
			},
			isComplete: function() { return $("#dtOption_" + rowNum).length > 0; }
		};
	};

	var _saveRow = function(rowNum) {
		return {
			option: $("#dtOption_" + rowNum).val()
		};
	};


	manager.registerDataType(MODULE_ID, {
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});


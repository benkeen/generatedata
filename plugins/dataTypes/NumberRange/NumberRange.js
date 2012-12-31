/*global $:false,define:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	var MODULE_ID = "data-type-NumberRange";
	var LANG = L.dataTypePlugins.NumberRange;


	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				$("#dtNumRangeMin_" + rowNum).val(data.rangeMin);
				$("#dtNumRangeMax_" + rowNum).val(data.rangeMax);
			},
			isComplete: function() { return true; }
		};
	};

	var _saveRow = function(rowNum) {
		return {
			rangeMin: $("#dtNumRangeMin_" + rowNum).val(),
			rangeMax: $("#dtNumRangeMax_" + rowNum).val()
		};
	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];

		var intOnly = /^\d+$/;
		for (var i=0; i<rows.length; i++) {
			var numWordsMin = $.trim($("#dtNumRangeMin_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);

			var hasError = false;
			if (numWordsMin === "" || !intOnly.test(numWordsMin)) {
				hasError = true;
				problemFields.push($("#dtNumRangeMin_" + rows[i]));
			}
			var numWordsMax = $.trim($("#dtNumRangeMax_" + rows[i]).val());
			if (numWordsMax === "" || !intOnly.test(numWordsMax)) {
				hasError = true;
				problemFields.push($("#dtNumRangeMax_" + rows[i]));
			}
			if (hasError) {
				visibleProblemRows.push(visibleRowNum);
			}
		}

		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	};

	manager.registerDataType(MODULE_ID, {
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});
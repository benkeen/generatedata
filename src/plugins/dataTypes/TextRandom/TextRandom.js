/*global $:false,define:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name TextRandom
	 * @description JS code for the TextRandom Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-TextRandom";
	var LANG = L.dataTypePlugins.TextRandom;

	var _saveRow = function(rowNum) {
		return {
			startsWithLipsum: $("#dtStartsWithLipsum_" + rowNum).attr("checked") ? 1 : 0,
			minWords: $("#dtNumWordsMin_" + rowNum).val(),
			maxWords: $("#dtNumWordsMax_" + rowNum).val()
		};
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() { },
			isComplete: function() {
				if ($("#dtNumWordsMax_" + rowNum).length) {
					if (data.startsWithLipsum == "1") {
						$("#dtStartsWithLipsum_" + rowNum).attr("checked", "checked");
					} else {
						$("#dtStartsWithLipsum_" + rowNum).removeAttr("checked");
					}
					$("#dtNumWordsMin_" + rowNum).val(data.minWords);
					$("#dtNumWordsMax_" + rowNum).val(data.maxWords);
					return true;
				}
				return false;
			}
		};
	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		var isInt = /^\d+$/;
		for (var i=0; i<rows.length; i++) {
			var numWordsMin = $.trim($("#dtNumWordsMin_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if (numWordsMin === "" || !isInt.test(numWordsMin)) {
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#dtNumWordsMin_" + rows[i]));
			}
			var numWordsMax = $.trim($("#dtNumWordsMax_" + rows[i]).val());
			if (numWordsMax === "" || !isInt.test(numWordsMax)) {
				if ($.inArray(visibleRowNum, visibleProblemRows) == -1) {
					visibleProblemRows.push(visibleRowNum);
				}
				problemFields.push($("#dtNumWordsMax_" + rows[i]));
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
		saveRow: _saveRow,
		loadRow: _loadRow
	});
});
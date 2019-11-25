/*global $:false,define:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name TextFixed
	 * @description JS code for the TextFixed Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-TextFixed";
	var LANG = L.dataTypePlugins.TextFixed;

	var _saveRow = function(rowNum) {
		return {
			numWords: $("#dtNumWords_" + rowNum).val()
		};
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() { },
			isComplete: function() {
				if (data && $("#dtNumWords_" + rowNum).length) {
					$("#dtNumWords_" + rowNum).val(data.numWords);
					return true;
				} else {
					return false;
				}
			}
		};
	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		var isInt = /^\d+$/;
		for (var i=0; i<rows.length; i++) {
			var numWords = $.trim($("#dtNumWords_" + rows[i]).val());
			if (numWords === "" || !isInt.test(numWords)) {
				var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#dtNumWords_" + rows[i]));
			}
		}
		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	};

	// register our module
	manager.registerDataType(MODULE_ID, {
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});

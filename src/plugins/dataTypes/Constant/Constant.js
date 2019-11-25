/*global $:false,define:false*/
define([
	"manager",
	"generator",
	"constants",
	"lang"
], function(manager, generator, C, L) {

	"use strict";

	/**
	* @name Constant
	* @description JS code for the Constant Data Type.
	* @see DataType
	* @namespace
	*/

	var MODULE_ID = "data-type-Constant";
	var LANG = L.dataTypePlugins.Constant;


	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {},
			isComplete: function() {
				if ($("#dtOption_" + rowNum).length) {
					$("#dtConstantLoopCount_" + rowNum).val(data.loopCount);
					$("#dtOption_" + rowNum).val(data.values);
					return true;
				} else {
					return false;
				}
			}
		};
	};

	var _saveRow = function(rowNum) {
		return {
			loopCount: $("#dtConstantLoopCount_" + rowNum).val(),
			values: $("#dtOption_" + rowNum).val()
		};
	};

	var _validate = function(rows) {
		var invalidLoopCountFields = [];
		var loopCountVisibleProblemRows = [];

		var emptyFields = [];
		var emptyFieldProblemRows = [];

		for (var i=0; i<rows.length; i++) {
			var loopVal = $.trim($("#dtConstantLoopCount_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if (loopVal === "" || !(/^\d+$/.test(loopVal))) {
				loopCountVisibleProblemRows.push(visibleRowNum);
				invalidLoopCountFields.push($("#dtConstantLoopCount_" + rows[i]));
			}
			if ($("#dtOption_" + rows[i]).val() === "") {
				emptyFieldProblemRows.push(visibleRowNum);
				emptyFields.push($("#dtOption_" + rows[i]));
			}
		}
		var errors = [];
		if (loopCountVisibleProblemRows.length) {
			errors.push({ els: invalidLoopCountFields, error: LANG.invalid_loop_counts + " <b>" + loopCountVisibleProblemRows.join(", ") + "</b>"});
		}
		if (emptyFields.length) {
			errors.push({ els: emptyFields, error: LANG.incomplete_fields + " <b>" + emptyFieldProblemRows.join(", ") + "</b>"});
		}

		return errors;
	};

	// register our module
	manager.registerDataType(MODULE_ID, {
		loadRow: _loadRow,
		saveRow: _saveRow,
		validate: _validate
	});

});



/*
var Constant_ns = {
  validate: function(rows)
  {
    var visibleProblemRows = [];
    var problemFields      = [];
    for (var i=0; i<rows.length; i++)
    {
      if ($("#option_" + rows[i]).val() == "")
      {
        var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
        visibleProblemRows.push(visibleRowNum);
        problemFields.push($("#option_" + rows[i]));
      }
    }

    if (visibleProblemRows.length)
      gd.errors.push({ els: problemFields, error: L.Constant_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
  },
}
*/
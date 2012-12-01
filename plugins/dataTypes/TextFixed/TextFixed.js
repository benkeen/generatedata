/*global $:false*/
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

	var _saveRow = function() {

	};

	var _loadRow = function() {

	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			var numWords = $.trim($("#dtNumWords_" + rows[i]).val());
			if (numWords === "") {
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



/*var TextFixed_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#numWords_" + rowNum).val(data.numWords);
      },
      function() { return $("#numWords_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "numWords": $("#numWords_" + rowNum).val()
    };
  }
}*/
/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	var MODULE_ID = "data-type-NumberRange";
	var LANG = L.dataTypePlugins.NumberRange;

	var _saveRow = function(rowNum) {
		
	};

	var _loadRow = function(rowNum, data) {

	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];

		for (var i=0; i<rows.length; i++) {
			var numWordsMin = $.trim($("#dtNumRangeMin_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if (numWordsMin === "") {
				problemFields.push($("#dtNumRangeMin_" + rows[i]));
			}
			var numWordsMax = $.trim($("#dtNumRangeMax_" + rows[i]).val());
			if (numWordsMax === "") {
				problemFields.push($("#dtNumRangeMax_" + rows[i]));
			}

			if (numWordsMin === "" || numWordsMax === "") {
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




/*var NumberRange_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#numRangeMin_" + rowNum).val(data.numRangeMin);
        $("#numRangeMax_" + rowNum).val(data.numRangeMax);
      },
      function() { return $("#numRangeMax_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "numRangeMin": $("#numRangeMin_" + rowNum).val(),
      "numRangeMax": $("#numRangeMax_" + rowNum).val()
    };
  }
}*/
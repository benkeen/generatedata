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

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			var numWordsMin = $.trim($("#dtNumWordsMin_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if (numWordsMin == "") {
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#dtNumWordsMin_" + rows[i]));
			}
			var numWordsMax = $.trim($("#dtNumWordsMax_" + rows[i]).val());
			if (numWordsMax == "") {
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#dtNumWordsMax_" + rows[i]));
			}
		}
		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	};

	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		validate: _validate
	});
});


/*
{
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#startsWithLipsum_" + rowNum).attr("checked", data.startsWithLipsum);
        $("#numWordsMin_" + rowNum).val(data.numWordsMin);
        $("#numWordsMax_" + rowNum).val(data.numWordsMax);
      },
      function() { return $("#numWords_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "startsWithLipsum": $("#startsWithLipsum_" + rowNum).attr("checked"),
      "numWordsMin":      $("#numWordsMin_" + rowNum).val(),
      "numWordsMax":      $("#numWordsMax_" + rowNum).val()
    };
  }
}
*/
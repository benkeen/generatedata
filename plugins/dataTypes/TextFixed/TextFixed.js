"use strict";

define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "data-type-TextFixed";
	var LANG = L.dataTypePlugins.TextFixed;

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			var numWords = $.trim($("#dtNumWords_" + rows[i]).val());
			if (numWords == "") {
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
	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		validate: _validate
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
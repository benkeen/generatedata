"use strict";

define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "data-type-AlphaNumeric";
	var LANG = L.dataTypePlugins.AlphaNumeric;
	var subscriptions = {};

	var _init = function() {
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	}

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	}

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			var currEl = $("#dtOption_" + rows[i]);
			if ($.trim(currEl.val()) == "") {
				var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push(currEl);
			}
		}
		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	}

	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init,
		validate: _validate
	});

});


/*
var _loadRow = function(rowNum, data) {
	return [
		function() {
			$("#dt_" + rowNum).val(data.example);
			$("#option_" + rowNum).val(data.option);
		},
		function() { return $("#option_" + rowNum).length > 0; }
	];
},

var saveRow = function(rowNum) {
	return {
		"example":  $("#dt_" + rowNum).val(),
		"option":   $("#option_" + rowNum).val()
	};
}
*/


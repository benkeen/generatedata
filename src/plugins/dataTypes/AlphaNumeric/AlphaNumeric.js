// "lang",
// "generator"

/**
 * @name AlphaNumeric
 * @description JS code for the AlphaNumeric Data Type.
 * @see DataType
 * @namespace
 */

// var MODULE_ID = "data-type-AlphaNumeric";
// var LANG = L.dataTypePlugins.AlphaNumeric;
// var subscriptions = {};

// var _init = function() {
// 	subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
// 	manager.subscribe(MODULE_ID, subscriptions);
// };

// const saveRow = (rowNum) => ({
// 	example: $("#dtExample_" + rowNum).val(),
// 	option:  $("#dtOption_" + rowNum).val()
// });
//
// const loadRow = (rowNum, data) => ({
// 	execute: () => {
// 		$("#dtExample_" + rowNum).val(data.example);
// 		$("#dtOption_" + rowNum).val(data.option);
// 	},
// 	isComplete: () => $("#dtOption_" + rowNum).length > 0
// });

const validate = (rows) => {
	var visibleProblemRows = [];
	var problemFields      = [];
	for (var i=0; i<rows.length; i++) {
		var currEl = $("#dtOption_" + rows[i]);
		if ($.trim(currEl.val()) === "") {
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
};

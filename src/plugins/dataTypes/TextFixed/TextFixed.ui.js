import React from 'react';

export const state = {
	numWords: 10
};


export const Options = ({ i18n, id }) => (
	<>
		{i18n.TextFixed_generate} #<input type="text" id={`${id}-numWords`} style={{ width: 30 }} value="10" />
		{i18n.TextFixed_words}
	</>
);

export const Help = ({ i18n }) => <p>{i18n.TextFixed_help}</p>;

// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	var isInt = /^\d+$/;
// 	for (var i=0; i<rows.length; i++) {
// 		var numWords = $.trim($("#dtNumWords_" + rows[i]).val());
// 		if (numWords === "" || !isInt.test(numWords)) {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtNumWords_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

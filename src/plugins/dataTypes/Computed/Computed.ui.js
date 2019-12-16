import React from "react";

export const state = {
	value: ''
};

export const Example = ({ i18n }) => i18n.see_help_dialog;

export const Options = ({ data, onUpdate }) => (
	<textarea onChange={(e) => onUpdate({ value: e.target.value })}>{data.value}</textarea>
);

export const Help = ({ i18n }) => (
	<>
		<p>
			{i18n.help_para1}
		</p>

		<p>
			{i18n.help_para2}
		</p>

		<ul>
			<li>{i18n.help_prop1}</li>
			<li>{i18n.help_prop2}</li>
			<li>{i18n.help_prop3}</li>
			<li>{i18n.help_prop4}</li>
		</ul>

		<b>{i18n.example}</b>

		<ul>
			<li>{i18n.example1}</li>
		</ul>
	</>
);


// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	for (var i=0; i<rows.length; i++) {
// 		if ($("#dtOption_" + rows[i]).val() === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#option_" + rows[i]));
// 		}
// 	}
//
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: L.AlphaNumeric_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
//
// 	return errors;
// };
//

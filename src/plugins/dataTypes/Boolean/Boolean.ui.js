import React from 'react';

export const state = {
	value: ''
};


export const Example = ({ i18n, data }) => (
	<select defaultValue={data.example}>
		<option value="">{i18n.please_select}</option>
		<option value="Yes|No">{i18n.example_YesNo}</option>
		<option value="False|True">{i18n.example_FalseTrue}</option>
		<option value="0|1">{i18n.example_ZeroOne}</option>
		<option value="Y|N">{i18n.example_YesNoShort}</option>
		<option value="F|T">{i18n.example_FalseTrueShort}</option>
		<option value="false|true">{i18n.example_FalseTrueLower}</option>
	</select>
);

export const Options = ({ data, onUpdate }) => (
	<input type="text" value={data.value} onChange={(e) => onUpdate({ value: e.target.value })}/>
);

export const Help = ({ i18n }) => (
	<>
		<p>
			{i18n["DATA_TYPE"]["DESC"]}
			{i18n.help_intro}
		</p>

		<ul>
			<li>{i18n.example_YesNo}</li>
			<li>{i18n.example_FalseTrue}</li>
			<li>{i18n.example_ZeroOne}</li>
			<li>{i18n.example_YesNoShort}</li>
			<li>{i18n.example_FalseTrueShort}</li>
			<li>{i18n.example_FalseTrueLower}</li>
		</ul>

		<p>
			{i18n.text_double_quotes}
		</p>
	</>
);

/**
 * Called when the user submits the form to generate some data. If the selected data set contains
 * one or more rows of this data type, this function is called with the list of row numbers. Note that
 * the row numbers passed are the *original* row numbers of the rows on creation. It's possible that the
 * user has re-sorted or deleted some rows. So to get the visible row number for a row, call
 * gen._getVisibleRowOrderByRowNum(row)
 */
// const _validate = function (rows) {
// 	var visibleProblemRows = [];
// 	var problemFields = [];
// 	for (var i = 0; i < rows.length; i++) {
// 		if ($("#dtOption_" + rows[i]).val() === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtOption_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({
// 			els: problemFields,
// 			error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"
// 		});
// 	}
// 	return errors;
// };

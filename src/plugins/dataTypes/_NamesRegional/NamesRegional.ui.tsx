import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export const state = {
	example: '',
	option: ''
};

export const Example = ({ coreI18n, i18n, data }: DTExampleProps) => (
	<select defaultValue={data.example}>
		<option value="">{coreI18n.please_select}</option>
		<option value="MaleName">{i18n.example_MaleName}</option>
		<option value="FemaleName">{i18n.example_FemaleName}</option>
		<option value="Name">{i18n.example_Name}</option>
		<option value="MaleName Surname">{i18n.example_MaleName_Surname}</option>
		<option value="FemaleName Surname">{i18n.example_FemaleName_Surname}</option>
		<option value="Name Surname">{i18n.example_Name_Surname}</option>
		<option value="Name Initial. Surname">{i18n.example_Name_Initial_Surname}</option>
		<option value="Surname">{i18n.example_surname}</option>
		<option value="Surname, Name Initial.">{i18n.example_Surname_Name_Initial}</option>
		<option value="Name, Name, Name, Name">{i18n.example_Name4}</option>
		<option value="Name Surname|Name Initial. Surname">{i18n.example_fullnames}</option>
	</select>
);

export const Options = ({ data, onUpdate }: DTOptionsProps) => (
	<input type="text" value={data.value} onChange={(e) => onUpdate({ value: e.target.value })}/>
);

export const Help = ({ i18n }: DTHelpProps) => (
	<>
		<p>
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td><h4>Name</h4></td>
				<td>{i18n.type_Name}</td>
			</tr>
			<tr>
				<td><h4>MaleName</h4></td>
				<td>{i18n.type_MaleName}</td>
			</tr>
			<tr>
				<td><h4>FemaleName</h4></td>
				<td>{i18n.type_FemaleName}</td>
			</tr>
			<tr>
				<td><h4>Initial</h4></td>
				<td>{i18n.type_Initial}</td>
			</tr>
			<tr>
				<td><h4>Surname</h4></td>
				<td>{i18n.type_Surname}</td>
			</tr>
		</table>
	</>
);

/**
 * Called when the user submits the form to generate some data. If the selected data set contains
 * one or more rows of this data type, this function is called with the list of row numbers. Note that
 * the row numbers passed are the *original* row numbers of the rows on creation. It's possible that the
 * user has re-sorted or deleted some rows. So to get the visible row number for a row, call
 * gen._getVisibleRowOrderByRowNum(row)
 */
// var _validate = function (rows) {
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

import * as React from 'react';
import { ExampleProps, HelpProps, OptionsProps } from '../../../../types/dataTypes';

export type OrganizationNumberState = {
	example: string;
	separator: string;
};

export const state: OrganizationNumberState = {
	example: '',
	separator: ' '
};

export const Example = ({ coreI18n, i18n, data }: ExampleProps): JSX.Element => (
	<select defaultValue={data.example}>
		<option value="">{coreI18n.please_select}</option>
		<option value="OrganisationNumberWithoutHyphen">{i18n.example_OrganisationNumberWithoutHyphen}</option>
		<option value="OrganisationNumberWithHyphen">{i18n.example_OrganisationNumberWithHyphen}</option>
	</select>
);

export const Options = ({ id, data, onUpdate, i18n }: OptionsProps): JSX.Element => {
	const onChange = (separator: string) => {
		onUpdate({
			...data,
			separator
		});
	};

	return (
		<span>
			{i18n.separators}
			<input type="text" id={`${id}-separator`}
				style={{ width: 78 }}
				value={data.separator}
				title={i18n.separator_help}
				onChange={(e): void => onChange(e.target.value)}
			/>
		</span>
	);
};

export const Help = ({ i18n }: HelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DATA_TYPE.DESC}
			{i18n.help_text}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td><h4>OrganisationNumberWithoutHyphen</h4></td>
				<td>{i18n.type_OrganisationNumberWithoutHyphen}</td>
			</tr>
			<tr>
				<td><h4>OrganisationNumberWithHyphen</h4></td>
				<td>{i18n.type_OrganisationNumberWithHyphen}</td>
			</tr>
		</table>
	</>
);


// var _exampleChange = function (msg) {
// 	var rowID = msg.rowID;
// 	var selectedFormat = msg.value;
//
// 	var $separatorField = $("#dtOptionOrganisationNumber_sep_" + rowID);
//
// 	switch (selectedFormat) {
// 		case "OrganisationNumberWithoutHyphen":
// 			$separatorField.val("");
// 			break;
//
// 		case "OrganisationNumberWithHyphen":
// 			$separatorField.val("-");
// 			break;
//
// 		default:
// 			//$separatorField.val(selectedFormat);
// 			break;
//
// 	}
// };

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

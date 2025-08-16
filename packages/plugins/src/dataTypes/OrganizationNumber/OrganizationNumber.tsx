import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: 'OrganisationNumberWithoutHyphen', label: i18n.example_OrganisationNumberWithoutHyphen },
		{ value: 'OrganisationNumberWithHyphen', label: i18n.example_OrganisationNumberWithHyphen }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ id, data, onUpdate, i18n }: DTOptionsProps): JSX.Element => {
	const onChange = (separator: string): void => {
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

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
			{i18n.help_text}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tbody>
				<tr>
					<td><h4>OrganisationNumberWithoutHyphen</h4></td>
					<td>{i18n.type_OrganisationNumberWithoutHyphen}</td>
				</tr>
				<tr>
					<td><h4>OrganisationNumberWithHyphen</h4></td>
					<td>{i18n.type_OrganisationNumberWithHyphen}</td>
				</tr>
			</tbody>
		</table>
	</>
);

export const getMetadata = (): DTMetadata => {
	// Called before separator is set, so margin should be used
	// $len = 10 + strlen(static::$sep);
	const len = 11; // Should be enough, allow for max one char sep
	return {
		sql: {
			field: `varchar(${len}) default NULL`,
			field_Oracle: `varchar2(${len}) default NULL`,
			field_MSSQL: `VARCHAR(${len}) NULL`
		}
	};
};


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

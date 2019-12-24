import * as React from 'react';
import Dropdown, { ChangeEvent } from '../../../components/dropdown/Dropdown';
import { DataTypeUIExampleProps, DataTypeUIHelpProps, DataTypeUIOptionsProps } from '../../../../types/general';

export const state = {
	example: '',
	options: ''
};

export const Example = ({ i18n, data, coreI18n, onUpdate }: DataTypeUIExampleProps) => {
    const onChange = (selected: ChangeEvent) => {
		onUpdate({
			...data,
			example: selected.value,
			options: selected.value
		});
	};

	const options = [
		{ value: '', label: coreI18n.please_select },
		{ value: 'MaleName', label: i18n.example_MaleName },
		{ value: 'FemaleName', label: i18n.example_FemaleName },
		{ value: 'Name', label: i18n.example_Name },
		{ value: 'MaleName Surname', label: i18n.example_MaleName_Surname },
		{ value: 'FemaleName Surname', label: i18n.example_FemaleName_Surname },
		{ value: 'Name Surname', label: i18n.example_Name_Surname },
		{ value: 'Name Initial. Surname', label: i18n.example_Name_Initial_Surname },
		{ value: 'Surname', label: i18n.example_surname },
		{ value: 'Surname, Name Initial.', label: i18n.example_Surname_Name_Initial },
		{ value: 'Name, Name, Name, Name', label: i18n.example_Name4 },
		{ value: 'Name Surname|Name Initial. Surname', label: i18n.example_fullnames },
	];

	return (
		<Dropdown
			value={data.example}
			options={options}
			onChange={onChange}
		/>
	);
};

export const Options = ({ data, onUpdate }: DataTypeUIOptionsProps) => (
	<input type="text" value={data.options} onChange={(e) => onUpdate({ ...data, options: e.target.value })}/>
);

export const Help = ({ i18n }: DataTypeUIHelpProps) => (
	<>
		<p>
			{i18n.DESC}
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tbody>
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
			</tbody>
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

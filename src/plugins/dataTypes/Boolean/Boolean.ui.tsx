import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import Dropdown from '../../../components/dropdown/Dropdown';

export type BooleanState = {
	example: string;
	value: string;
};

export const initialState: BooleanState = {
	example: 'false',
	value: 'true'
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: 'Yes|No', label: i18n.example_YesNo },
		{ value: 'True|False', label: i18n.example_TrueFalse },
		{ value: 'true|false', label: i18n.example_TrueFalseLower },
		{ value: '0|1', label: i18n.example_ZeroOne },
		{ value: 'Y|N', label: i18n.example_YesNoShort },
		{ value: 'F|T', label: i18n.example_FalseTrueShort }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ data, onUpdate }: DTOptionsProps): JSX.Element => (
	<input
		type="text"
		value={data.value}
		onChange={(e): void => onUpdate({ ...data, value: e.target.value })}
		style={{ width: '100%' }}
	/>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
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

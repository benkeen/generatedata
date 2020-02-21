import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';
import { ExampleProps, OptionsProps, HelpProps } from '../../../../types/dataTypes';

export type AlphanumericState = {
	example: string;
	value: string;
}

export const state: AlphanumericState = {
	example: '',
	value: ''
};

export const Example = ({ i18n, data, onUpdate }: ExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: 'LxL xLx', label: `V6M 4C1 ${i18n.example_CanPostalCode}` },
		{ value: 'xxxxx', label: `90210 ${i18n.example_USZipCode}` },
		{ value: 'LLLxxLLLxLL', label: `eZg29gdF5K1 ${i18n.example_Password}` }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ data, onUpdate }: OptionsProps): JSX.Element => (
	<input
		type="text"
		value={data.value}
		onChange={(e): void => onUpdate({ ...data, value: e.target.value })}
		style={{ width: '100%' }}
	/>
);

export const Help = ({ i18n }: HelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tbody>
			<tr>
				<td><h4>L</h4></td>
				<td>{i18n.help_1}</td>
				<td><h4>V</h4></td>
				<td>{i18n.help_2}</td>
			</tr>
			<tr>
				<td><h4>l</h4></td>
				<td>{i18n.help_3}</td>
				<td><h4>v</h4></td>
				<td>{i18n.help_4}</td>
			</tr>
			<tr>
				<td><h4>D</h4></td>
				<td>{i18n.help_5}</td>
				<td><h4>F</h4></td>
				<td>{i18n.help_6}</td>
			</tr>
			<tr>
				<td><h4>C</h4></td>
				<td>{i18n.help_7}</td>
				<td><h4>x</h4></td>
				<td>{i18n.help_8}</td>
			</tr>
			<tr>
				<td><h4>c</h4></td>
				<td>{i18n.help_9}</td>
				<td><h4>X</h4></td>
				<td>{i18n.help_10}</td>
			</tr>
			<tr>
				<td><h4>E</h4></td>
				<td>{i18n.help_11}</td>
				<td><h4>H</h4></td>
				<td>{i18n.help_12}</td>
			</tr>
			</tbody>
		</table>
	</>
);

// export const validate = (rows, coreI18n) => {
// 	var visibleProblemRows = [];
// 	var problemFields = [];
//
// 	for (var i = 0; i < rows.length; i++) {
// 		var currEl = $("#dtOption_" + rows[i]);
// 		if ($.trim(currEl.val()) === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push(currEl);
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({
// 			els: problemFields,
// 			error: i18n.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"
// 		});
// 	}
// 	return errors;
// };

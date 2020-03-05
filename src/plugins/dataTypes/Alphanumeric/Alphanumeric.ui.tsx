import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';
import { DTExampleProps, DTOptionsProps, DTHelpProps } from '../../../../types/dataTypes';

export type AlphanumericState = {
	example: string;
	value: string;
}

export const initialState: AlphanumericState = {
	example: '',
	value: ''
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: 'LxL xLx', label: `V6M 4C1 ${i18n.exampleCanPostalCode}` },
		{ value: 'xxxxx', label: `90210 ${i18n.exampleUSZipCode}` },
		{ value: 'LLLxxLLLxLL', label: `eZg29gdF5K1 ${i18n.examplePassword}` }
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
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tbody>
				<tr>
					<td><h4>L</h4></td>
					<td>{i18n.help1}</td>
					<td><h4>V</h4></td>
					<td>{i18n.help2}</td>
				</tr>
				<tr>
					<td><h4>l</h4></td>
					<td>{i18n.help3}</td>
					<td><h4>v</h4></td>
					<td>{i18n.help4}</td>
				</tr>
				<tr>
					<td><h4>D</h4></td>
					<td>{i18n.help5}</td>
					<td><h4>F</h4></td>
					<td>{i18n.help6}</td>
				</tr>
				<tr>
					<td><h4>C</h4></td>
					<td>{i18n.help7}</td>
					<td><h4>x</h4></td>
					<td>{i18n.help8}</td>
				</tr>
				<tr>
					<td><h4>c</h4></td>
					<td>{i18n.help9}</td>
					<td><h4>X</h4></td>
					<td>{i18n.help10}</td>
				</tr>
				<tr>
					<td><h4>E</h4></td>
					<td>{i18n.help11}</td>
					<td><h4>H</h4></td>
					<td>{i18n.help12}</td>
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

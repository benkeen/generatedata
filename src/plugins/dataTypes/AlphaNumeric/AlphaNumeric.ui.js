import React from 'react';

// allow users to define a default data structure for all new rows
export const state = {
	example: '',
	value: ''
};

export const Example = ({ coreI18n, i18n, data, onUpdate }) => {
	const onChange = (e) => {
		const value = e.target.value;
		onUpdate({
			example: value,
			value: value
		});
	};
	return (
		<select onChange={onChange} defaultValue={data.example}>
			<option value="">{coreI18n.please_select}</option>
			<option value="LxL xLx">V6M 4C1 {i18n.example_CanPostalCode}</option>
			<option value="xxxxx">90210 {i18n.example_USZipCode}</option>
			<option value="LLLxxLLLxLL">eZg29gdF5K1 {i18n.example_Password}</option>
		</select>
	);
};

export const Options = ({ data, onUpdate }) => (
	<input type="text" value={data.value} onChange={(e) => onUpdate({ value: e.target.value })}/>
);

export const Help = ({ i18n }) => (
	<>
		<p>
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1" width="100%">
			<tr>
				<td width="20"><h4>L</h4></td>
				<td width="200">{i18n.help_1}</td>
				<td width="20"><h4>V</h4></td>
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

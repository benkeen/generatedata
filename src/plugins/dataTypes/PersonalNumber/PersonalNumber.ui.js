import React from 'react';


export const state = {
	example: '',
	separator: ' '
};

export const Example = ({ coreI18n, i18n }) => (
	<select>
		<option value="">{coreI18n.please_select}</option>
		<option value="PersonalNumberWithoutHyphen">{i18n.example_PersonalNumberWithoutHyphen}</option>
		<option value="PersonalNumberWithHyphen">{i18n.example_PersonalNumberWithHyphen}</option>
	</select>
);

export const Options = ({ i18n, data }) => (
	<div>
		{i18n.separators}
		<input type="text" style={{ width: 78 }} value={data.separator} title={i18n.separator_help} />
	</div>
);

export const Help = ({ i18n }) => (
	<>
		<p>
			{i18n.DATA_TYPE.DESC}
			{i18n.help_text}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td width="100"><h4>PersonalNumberWithoutHyphen</h4></td>
				<td>{i18n.type_PersonalNumberWithoutHyphen}</td>
			</tr>
			<tr>
				<td><h4>PersonalNumberWithHyphen</h4></td>
				<td>{i18n.type_PersonalNumberWithHyphen}</td>
			</tr>
		</table>
	</>
);


// var _exampleChange = function (msg) {
// 	var rowID = msg.rowID;
// 	var selectedFormat = msg.value;
//
// 	var optionValue = "";
// 	if (selectedFormat === "PersonalNumberWithHyphen") {
// 		optionValue = "-";
// 	}
// 	$("#dtOptionPersonalNumber_sep_" + rowID).val(optionValue);
// };


/**
 * No validation currently required.
 */
// var _validate = function () {
// 	return [];
// };


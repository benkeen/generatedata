import * as React from 'react';
import { ExampleProps, HelpProps, OptionsProps } from '../../../../types/dataTypes';
import Dropdown from '../../../components/dropdown/Dropdown';


// TODO: figure out what this component IS. Is it for specific countries? Sweden has 12 chars...
// https://en.wikipedia.org/wiki/Personal_identity_number_%28Sweden%29

export const state = {
	example: '',
	separator: ' '
};

export const Example = ({ coreI18n, i18n, data, onUpdate }: ExampleProps): React.ReactNode => {

	const onChange = (value: any) => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: '', label: coreI18n.please_select },
		{ value: 'PersonalNumberWithoutHyphen', label: i18n.example_PersonalNumberWithoutHyphen },
		{ value: 'PersonalNumberWithHyphen', label: i18n.example_PersonalNumberWithHyphen }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any) => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ i18n, data }: OptionsProps): React.ReactNode => (
	<div>
		{i18n.separators}
		<input type="text" style={{ width: 78 }} value={data.separator} title={i18n.separator_help} />
	</div>
);

export const Help = ({ i18n }: HelpProps): React.ReactNode => (
	<>
		<p>
			{i18n.DATA_TYPE.DESC}
			{i18n.help_text}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td><h4>PersonalNumberWithoutHyphen</h4></td>
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

import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export type PhoneState = {
	example: string;
	option: string;
};

export const initialState: PhoneState = {
	example: '1-Xxx-Xxx-xxxx',
	option: '1-Xxx-Xxx-xxxx'
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			option: value
		});
	};

	const options = [
		{ value: '1-Xxx-Xxx-xxxx', label: i18n.example_1 },
		{ value: '(Xxx) Xxx-xxxx', label: i18n.example_2 },
		{ value: '(01xxxx) xxxxx|(01xxx) xxxxxx|(01x1) xxx xxxx|(011x) xxx xxxx|(02x) xxxx xxxx|03xx xxx xxxx|055 xxxx xxxx|056 xxxx xxxx|070 xxxx xxxx|07624 xxxxxx|076 xxxx xxxx|07xxx xxxxxx|0800 xxx xxxx|08xx xxx xxxx|09xx xxx xxxx|(016977) xxxx|(01xxx) xxxxx|0500 xxxxxx|0800 xxxxxx|0800 1111|0845 46 4x', label: i18n.uk },
		{ value: '0X xx xx xx xx', label: i18n.france },
		{ value: '(0X) xxxx xxxx', label: i18n.australia },
		{ value: '(0xx) xxxxxxxx|(0xxx) xxxxxxxx|(0xxxx) xxxxxxx|(03xxxx) xxxxxx', label: i18n.germany },
		{ value: '0xx-xxx-xxxx', label: i18n.japan },
		{ value: '1-Xxx-Xxx-xxxx|Xxx-xxxx', label: i18n.different_formats }
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
		value={data.option}
		onChange={(e): void => onUpdate({ ...initialState, option: e.target.value })}
		style={{ width: '100%' }}
	/>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help_text1}
		</p>
		<p>
			{i18n.help_text2}
		</p>
		<p>
			{i18n.help_text3}
		</p>
	</>
);

// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	for (var i=0; i<rows.length; i++) {
// 		if ($("#dtOption_" + rows[i]).val() === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtOption_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

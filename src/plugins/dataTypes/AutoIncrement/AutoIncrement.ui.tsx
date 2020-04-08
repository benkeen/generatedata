import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export type AutoIncrementState = {
	example: string;
	incrementStart: number;
	incrementValue: number;
	incrementPlaceholder: string;
}

export const initialState: AutoIncrementState = {
	example: '1,1',
	incrementStart: 1,
	incrementValue: 1,
	incrementPlaceholder: ''
};

export const Example = ({ data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: string): void => {
		const [incrementStart, incrementValue, incrementPlaceholder] = value.split(',');

		onUpdate({
			example: value,
			incrementStart: parseFloat(incrementStart),
			incrementValue: parseFloat(incrementValue),
			incrementPlaceholder
		});
	};

	const options = [
		{ value: '1,1,', label: '1, 2, 3, 4, 5, 6...' },
		{ value: '100,1,', label: '100, 101, 102, 103, 104...' },
		{ value: '0,2,', label: '0, 2, 4, 6, 8, 10...' },
		{ value: '0,5,', label: '0, 5, 10, 15, 20, 25...' },
		{ value: '1000,-1,', label: '1000, 999, 998, 997...' },
		{ value: '0,-1,', label: '0, -1, -2, -3, -4...' },
		{ value: '0,0.5,', label: '0, 0.5, 1, 1.5, 2...' },
		{ value: '1,1,ROW-${INCR}', label: 'ROW-1, ROW-2, ROW-3,...' },
		{ value: '2,4,${INCR}i', label: '2i, 4i, 6i, 8i...' }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: number | string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<>
			{i18n.startAt}
			<input type="text" style={{ width: 40 }} value={data.incrementStart}
				onChange={(e): void => onChange('incrementStart', parseFloat(e.target.value))} />
			{i18n.increment}
			<input type="text" style={{ width: 40 }} value={data.incrementValue}
				onChange={(e): void => onChange('incrementValue', parseFloat(e.target.value))} />

			<br />
			{i18n.placeholderStr}
			<input type="text" style={{ width: 100 }} value={data.incrementPlaceholder}
				onChange={(e): void => onChange('incrementPlaceholder', e.target.value)} />
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help_intro}
		</p>
		<p>
			{i18n.help_para2}
		</p>
		<ul>
			<li><b>ROW-INCR</b> -&gt; ROW-1, ROW-2, ROW-3, ROW-4, ...</li>
			<li><b>INCR F</b> -&gt; 1F, 2F, 3F, 4F, ...</li>
		</ul>
	</>
);

// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	for (var i=0; i<rows.length; i++) {
// 		var autoIncrementStart = $.trim($("#dtAutoIncrementStart_" + rows[i]).val());
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 		if (autoIncrementStart === "") {
// 			problemFields.push($("#dtAutoIncrementStart_" + rows[i]));
// 		}
// 		var autoIncrementEnd = $.trim($("#dtAutoIncrementValue_" + rows[i]).val());
// 		if (autoIncrementEnd === "") {
// 			problemFields.push($("#dtAutoIncrementValue_" + rows[i]));
// 		}
// 		if (autoIncrementStart === "" || autoIncrementEnd === "") {
// 			visibleProblemRows.push(visibleRowNum);
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

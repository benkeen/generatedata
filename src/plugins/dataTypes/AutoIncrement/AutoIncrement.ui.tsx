import * as React from 'react';
import { ExampleProps, HelpProps, OptionsProps } from '../../../../types/dataTypes';

export type AutoIncrementState = {
    example: string;
    incrementStart: number;
    incrementValue: number;
    incrementPlaceholder: string;
}

export const state: AutoIncrementState = {
	example: '1,1',
	incrementStart: 1,
	incrementValue: 1,
	incrementPlaceholder: ''
};

export const Example = ({ data, onUpdate }: ExampleProps) => {
    const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const value = (e.target as HTMLSelectElement).value;
        const [incrementStart, incrementValue, incrementPlaceholder] = value.split(',');

		onUpdate({
			example: value,
			incrementStart: parseFloat(incrementStart),
			incrementValue: parseFloat(incrementValue),
			incrementPlaceholder
		});
	};

	return (
		<select onChange={onChange} defaultValue={data.example}>
			<option value="1,1,">1, 2, 3, 4, 5, 6...</option>
			<option value="100,1,">100, 101, 102, 103, 104...</option>
			<option value="0,2,">0, 2, 4, 6, 8, 10...</option>
			<option value="0,5,">0, 5, 10, 15, 20, 25...</option>
			<option value="1000,-1,">1000, 999, 998, 997...</option>
			<option value="0,-1,">0, -1, -2, -3, -4...</option>
			<option value="0,0.5,">0, 0.5, 1, 1.5, 2...</option>
			<option value="1,1,ROW-${INCR}">ROW-1, ROW-2, ROW-3,...</option>
			<option value="2,4,${INCR}i">2i, 4i, 6i, 8i...</option>
		</select>
	);
};

export const Options = ({ i18n, data, onUpdate }: OptionsProps) => {
    const onChange = (field: string, value: number | string) => {
        onUpdate({
            ...data,
            [field]: value
        });
    };

	return (
		<>
			{i18n.start_at_c}
			<input type="text" style={{ width: 40 }} value={data.incrementStart}
                onChange={(e) => onChange('incrementStart', parseFloat(e.target.value))} />
			{i18n.increment_c}
			<input type="text" style={{ width: 40 }} value={data.incrementValue}
                onChange={(e) => onChange('incrementValue', parseFloat(e.target.value))} />
			{i18n.placeholder_str}
			<input type="text" style={{ width: 140 }} value={data.incrementPlaceholder}
                onChange={(e) => onChange('incrementPlaceholder', e.target.value)} />
		</>
	);
};

export const Help = ({ i18n }: HelpProps) => (
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

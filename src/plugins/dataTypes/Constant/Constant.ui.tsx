import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export type ConstantState = {
	loopCount: string;
	values: string;
}

export const initialState: ConstantState = {
	loopCount: '10',
	values: ''
};

export const Example = ({ coreI18n }: DTExampleProps): string => coreI18n.seeHelpDialog;

export const Options = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<div>
			{i18n.loopCount}
			<input type="text" value={data.loopCount} size={5}
				onChange={(e): void => onChange('loopCount', e.target.value)} />
			<br />

			{i18n.values}
			<input value={data.values} style={{ width: '100%' }}
				onChange={(e): void => onChange('values', e.target.value)} />
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help1}
		</p>
		<ul>
			<li>{i18n.help2}</li>
			<li>{i18n.help3}</li>
			<li>{i18n.help4}</li>
		</ul>
		<p>
			{i18n.help5}
		</p>
	</>
);

// var _validate = function(rows) {
// 		var invalidLoopCountFields = [];
// 		var loopCountVisibleProblemRows = [];
//
// 		var emptyFields = [];
// 		var emptyFieldProblemRows = [];
//
// 		for (var i=0; i<rows.length; i++) {
// 			var loopVal = $.trim($("#dtConstantLoopCount_" + rows[i]).val());
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			if (loopVal === "" || !(/^\d+$/.test(loopVal))) {
// 				loopCountVisibleProblemRows.push(visibleRowNum);
// 				invalidLoopCountFields.push($("#dtConstantLoopCount_" + rows[i]));
// 			}
// 			if ($("#dtOption_" + rows[i]).val() === "") {
// 				emptyFieldProblemRows.push(visibleRowNum);
// 				emptyFields.push($("#dtOption_" + rows[i]));
// 			}
// 		}
// 		var errors = [];
// 		if (loopCountVisibleProblemRows.length) {
// 			errors.push({ els: invalidLoopCountFields, error: LANG.invalid_loop_counts + " <b>" + loopCountVisibleProblemRows.join(", ") + "</b>"});
// 		}
// 		if (emptyFields.length) {
// 			errors.push({ els: emptyFields, error: LANG.incomplete_fields + " <b>" + emptyFieldProblemRows.join(", ") + "</b>"});
// 		}
//
// 		return errors;
// 	};

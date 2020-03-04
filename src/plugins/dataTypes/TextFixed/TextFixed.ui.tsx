import * as React from 'react';
import { DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export type TextFixedState = {
	numWords: number;
};

export const initialState: TextFixedState = {
	numWords: 10
};

export const Options = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
		// @ts-ignore
		const value = e.target.value;
		onUpdate({
			numWords: value
		});
	};
	return (
		<>
			{i18n.TextFixed_generate}
			<input
				type="number"
				style={{ width: 50, margin: '0 2px' }}
				value={data.numWords}
				onChange={onChange}
			/>
			{i18n.TextFixed_words}
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.TextFixed_help}</p>;

// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	var isInt = /^\d+$/;
// 	for (var i=0; i<rows.length; i++) {
// 		var numWords = $.trim($("#dtNumWords_" + rows[i]).val());
// 		if (numWords === "" || !isInt.test(numWords)) {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtNumWords_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

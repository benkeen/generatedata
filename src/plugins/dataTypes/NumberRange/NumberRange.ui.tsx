import * as React from 'react';
import { DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export type NumberRangeState = {
	min: number;
	max: number;
};

export const initialState: NumberRangeState = {
	min: 0,
	max: 10
};

export const Options = ({ data, i18n, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<div>
			{i18n.between}
			<input
				type="number"
				style={{ width: 50 }}
				value={data.min}
				onChange={(e: any): void => onChange('min', e.target.value)}
			/>
			{i18n.and}
			<input
				type="number"
				style={{ width: 50 }}
				value={data.max}
				onChange={(e: any): void => onChange('max', e.target.value)}
			/>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.DESC}</p>;


// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
//
// 	var intOnly = /^[\-\d]+$/;
// 	for (var i=0; i<rows.length; i++) {
// 		var numWordsMin = $.trim($("#dtNumRangeMin_" + rows[i]).val());
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
//
// 		var hasError = false;
// 		if (numWordsMin === "" || !intOnly.test(numWordsMin)) {
// 			hasError = true;
// 			problemFields.push($("#dtNumRangeMin_" + rows[i]));
// 		}
// 		var numWordsMax = $.trim($("#dtNumRangeMax_" + rows[i]).val());
// 		if (numWordsMax === "" || !intOnly.test(numWordsMax)) {
// 			hasError = true;
// 			problemFields.push($("#dtNumRangeMax_" + rows[i]));
// 		}
// 		if (hasError) {
// 			visibleProblemRows.push(visibleRowNum);
// 		}
// 	}
//
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

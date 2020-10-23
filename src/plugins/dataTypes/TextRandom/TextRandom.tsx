import * as React from 'react';
import TextField from '~components/TextField';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';

type TextRandomState = {
	startsWithLipsum: boolean;
	minWords: number;
	maxWords: number;
};

export const initialState: TextRandomState = {
	startsWithLipsum: false,
	minWords: 1,
	maxWords: 10
};

export const Options = ({ coreI18n, i18n, id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const minWordsError = data.minWords ? '' : coreI18n.requiredField;
	const maxWordsError = data.maxWords ? '' : coreI18n.requiredField;

	return (
		<>
			<div style={{ margin: '5px 0 2px' }}>
				<input
					type="checkbox"
					id={`${id}-startsWithLipsum`}
					checked={data.startsWithLipsum}
					onChange={(e: any): void => onChange('startsWithLipsum', e.target.checked)}
				/>
				<label htmlFor={`${id}-startsWithLipsum`}>{i18n.startWithLipsum}</label>
			</div>
			<div style={{ marginLeft: 3 }}>
				{i18n.generate}
				<TextField
					type="number"
					min="0"
					error={minWordsError}
					id={`${id}-minWords`}
					style={{ width: 50, margin: '0 2px' }}
					value={data.minWords}
					onChange={(e: any): void => onChange('minWords', e.target.value)}
				/>
				{i18n.to}
				<TextField
					type="number"
					min="0"
					error={maxWordsError}
					id={`${id}-maxWords`}
					style={{ width: 50, margin: '0 2px' }}
					value={data.maxWords}
					onChange={(e: any): void => onChange('maxWords', e.target.value)}
				/>
				{i18n.words}
			</div>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.help}</p>;

// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	var isInt = /^\d+$/;
// 	for (var i=0; i<rows.length; i++) {
// 		var numWordsMin = $.trim($("#dtNumWordsMin_" + rows[i]).val());
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 		if (numWordsMin === "" || !isInt.test(numWordsMin)) {
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtNumWordsMin_" + rows[i]));
// 		}
// 		var numWordsMax = $.trim($("#dtNumWordsMax_" + rows[i]).val());
// 		if (numWordsMax === "" || !isInt.test(numWordsMax)) {
// 			if ($.inArray(visibleRowNum, visibleProblemRows) == -1) {
// 				visibleProblemRows.push(visibleRowNum);
// 			}
// 			problemFields.push($("#dtNumWordsMax_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };


export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL'
	}
});

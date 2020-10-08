import * as React from 'react';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { ErrorTooltip } from '~components/tooltips';
import sharedStyles from '../../../styles/shared.scss';

export type NumberRangeState = {
	min: number;
	max: number;
};

export const initialState: NumberRangeState = {
	min: 0,
	max: 10
};

export const rowStateReducer = (state: NumberRangeState): NumberRangeState => state;

export const Options = ({ data, i18n, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	let minFieldError = '';
	let minFieldClasses = '';
	if (data.min === '') {
		minFieldError = i18n.enterNumericValue;
		minFieldClasses = sharedStyles.errorField;
	}

	let maxFieldError = '';
	let maxFieldClasses = '';
	if (data.max === '') {
		maxFieldError = i18n.enterNumericValue;
		maxFieldClasses = sharedStyles.errorField;
	}
	if (data.min !== '' && data.max !== '') {
		const min = parseInt(data.min, 10);
		const max = parseInt(data.max, 10);
		if (min > max) {
			maxFieldError = i18n.minValueGreaterThanMax;
			maxFieldClasses = sharedStyles.errorField;
		}
	}

	return (
		<div>
			{i18n.between}
			<ErrorTooltip title={minFieldError} arrow disableHoverListener={!minFieldError} disableFocusListener={!minFieldError}>
				<input
					type="number"
					style={{ width: 50, marginLeft: 2, marginRight: 2 }}
					min={0}
					value={data.min}
					className={minFieldClasses}
					onChange={(e: any): void => onChange('min', e.target.value)}
				/>
			</ErrorTooltip>
			{i18n.and}
			<ErrorTooltip title={maxFieldError} arrow disableHoverListener={!minFieldError} disableFocusListener={!maxFieldError}>
				<input
					type="number"
					style={{ width: 50, marginLeft: 2 }}
					min={0}
					value={data.max}
					className={maxFieldClasses}
					onChange={(e: any): void => onChange('max', e.target.value)}
				/>
			</ErrorTooltip>
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

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'number'
	},
	sql: {
		field: 'mediumint default NULL',
		field_Oracle: 'varchar2(50) default NULL',
		field_MSSQL: 'INTEGER NULL',
		field_Postgres: 'integer NULL',
	}
});

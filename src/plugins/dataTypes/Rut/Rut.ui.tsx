import * as React from 'react';
import { DTExampleProps, DTOptionsProps } from '../../../../types/dataTypes';

type RutState = {
	example: string;
	thousandSep: boolean;
	upper: boolean;
	remDash: boolean;
};

export const initialState: RutState = {
	example: '',
	thousandSep: true,
	upper: true,
	remDash: true
};

export const Example = ({ coreI18n, i18n }: DTExampleProps): JSX.Element => (
	<select>
		<option value="">{coreI18n.please_select}</option>
		<option value="xxxxxxxx-y">12345678-9 ({i18n.rut_default})</option>
		<option value="xxxxxxxx">12345678 ({i18n.only_number})</option>
		<option value="y">9 ({i18n.only_digit})</option>
	</select>
);

export const Options = ({ i18n, id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: boolean): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<>
			<input type="checkbox" id={`${id}-thousandSep`} checked={data.thousandSep}
				onChange={(e): void => onChange('thousandSep', e.target.checked)} />
			<label htmlFor={`${id}-thousandSep`}>{i18n.thousands_separator}</label><br/>
			<input type="checkbox" id={`${id}-upper`} checked={data.upper}
				onChange={(e): void => onChange('upper', e.target.checked)} />
			<label htmlFor={`${id}-upper`}>{i18n.digit_uppercase}</label><br/>
			<input type="checkbox" id={`${id}-remDash`} checked={data.remDash}
				onChange={(e): void => onChange('remDash', e.target.checked)} />
			<label htmlFor={`${id}-remDash`}>{i18n.remove_dash}</label>
		</>
	);
};


// var _validate = function (rows) {
// 	var visibleProblemRows = [];
// 	var problemFields = [];
// 	for (var i = 0; i < rows.length; i++) {
// 		if ($("#dtExample_" + rows[i]).val() === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtExample_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({
// 			els: problemFields,
// 			error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"
// 		});
// 	}
// 	return errors;
// };

// var _loadRow = function (rowNum, data) {
// 	return {
// 		execute: function () {
// 		},
// 		isComplete: function () {
// 			$("#dtExample_" + rowNum).val(data.example);
//
// 			if ($("#dtThouSep_" + rowNum).length) {
// 				if (data.thousep) {
// 					$("#dtThouSep_" + rowNum).attr("checked", "checked");
// 				} else {
// 					$("#dtThouSep_" + rowNum).removeAttr("checked");
// 				}
// 			}
// 			if ($("#dtUpperDigit_" + rowNum).length) {
// 				if (data.upper) {
// 					$("#dtUpperDigit_" + rowNum).attr("checked", "checked");
// 				} else {
// 					$("#dtUpperDigit_" + rowNum).removeAttr("checked");
// 				}
// 			}
// 			if ($("#dtRemoveDash_" + rowNum).length) {
// 				if (data.remdash) {
// 					$("#dtRemoveDash_" + rowNum).attr("checked", "checked");
// 				} else {
// 					$("#dtRemoveDash_" + rowNum).removeAttr("checked");
// 				}
// 			}
//
// 			return true;
// 		}
// 	};
// };

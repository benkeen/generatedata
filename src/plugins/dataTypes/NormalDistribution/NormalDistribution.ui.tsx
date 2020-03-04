import * as React from 'react';
import { DTOptionsProps } from '../../../../types/dataTypes';

type NormalDistributionState = {
	mean: string;
	sigma: string;
	precision: number;
};

export const initialState: NormalDistributionState = {
	mean: '',
	sigma: '',
	precision: 10
};

export const Options = ({ i18n, id, data }: DTOptionsProps): JSX.Element => (
	<>
		<label htmlFor={`${id}-mean`}>{i18n.mean}</label>
		<input type="text" id={`${id}-mean`} style={{ width: 25 }} value={data.mean} />
		<label htmlFor={`${id}-sigma`}>{i18n.standard_deviation}</label>
		<input type="text" id={`${id}-sigma`} style={{ width: 25 }} value={data.sigma} />
		<label htmlFor={`${id}-precision`} title="Number of decimal places.">{i18n.precision}</label>
		<input type="text" id={`${id}-precision`} style={{ width: 25 }} value={data.precision} />
	</>
);


// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	for (var i=0; i<rows.length; i++) {
// 		var currMean  = $("#dtOptionMean_" + rows[i]);
// 		var currSigma = $("#dtOptionSigma_" + rows[i]);
// 		var currPrecision = $("#dtOptionPrecision_" + rows[i]);
//
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 		if ($.trim(currMean.val()) === "" || $.trim(currSigma.val()) === "") {
// 			visibleProblemRows.push(visibleRowNum);
//
// 			if ($.trim(currMean.val()) === "") {
// 				problemFields.push(currMean);
// 			}
// 			if ($.trim(currSigma.val()) === "") {
// 				problemFields.push(currSigma);
// 			}
//             if ($.trim(currPrecision.val()) === "") {
//                 problemFields.push(currPrecision);
//             }
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

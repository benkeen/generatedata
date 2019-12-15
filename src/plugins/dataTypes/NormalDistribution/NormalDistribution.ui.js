import React from 'react';

export const state = {
	mean: '',
	sigma: '',
	precision: ''
};

export const Options = ({ i18n }) => (
	<>
		<label for="dtOptionMean_%ROW%">{i18n.mean}</label>
			<input type="text" name="dtOptionMean_%ROW%" id="dtOptionMean_%ROW%" style="width: 25px" value="0" />
		<label for="dtOptionSigma_%ROW%">{i18n.standard_deviation}</label>
			<input type="text" name="dtOptionSigma_%ROW%" id="dtOptionSigma_%ROW%" style="width: 25px" value="1" />
		<label for="dtOptionPrecision_%ROW%" title="Number of decimal places.">{i18n.precision}</label>
			<input type="text" name="dtOptionPrecision_%ROW%" id="dtOptionPrecision_%ROW%" style="width: 25px" value="10" />
	</>
);


var _validate = function(rows) {
	var visibleProblemRows = [];
	var problemFields      = [];
	for (var i=0; i<rows.length; i++) {
		var currMean  = $("#dtOptionMean_" + rows[i]);
		var currSigma = $("#dtOptionSigma_" + rows[i]);
		var currPrecision = $("#dtOptionPrecision_" + rows[i]);

		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
		if ($.trim(currMean.val()) === "" || $.trim(currSigma.val()) === "") {
			visibleProblemRows.push(visibleRowNum);

			if ($.trim(currMean.val()) === "") {
				problemFields.push(currMean);
			}
			if ($.trim(currSigma.val()) === "") {
				problemFields.push(currSigma);
			}
            if ($.trim(currPrecision.val()) === "") {
                problemFields.push(currPrecision);
            }
		}
	}
	var errors = [];
	if (visibleProblemRows.length) {
		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
	}
	return errors;
};

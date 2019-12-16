import React from 'react';

export const state = {
	example: '',
	listType1: '',
	listType2: '',
	exactly: '',
	atMost: '',
	option: ''
};

export const Example = ({ coreI18n, i18n }) => (
	<>
		<select>
			<option value="">{coreI18n.please_select}</option>
			<option value="1|3|5|7|9|11|13|15|17|19|21|23|25|27|29|31|33|35|37|39|41|43|45|47|49">{i18n.example_1}</option>
			<option value="2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50">{i18n.example_2}</option>
			<option value="1|2|3|4|5|6|7|8|9|10">1-10</option>
			<option value={i18n.one_to_ten}>{i18n.example_3}</option>
			<option value="1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97">{i18n.example_4}</option>
			<option value={i18n.colours}>{i18n.example_5}</option>
			<option value={i18n.relationship_states}>{i18n.example_6}</option>
			<option value={i18n.prefix}>{i18n.example_7}</option>
			<option value={i18n.company_names}>{i18n.example_8}</option>
			<option value={i18n.companies}>{i18n.example_9}</option>
			<option value={i18n.drug_names}>{i18n.example_10}</option>
			<option value={i18n.food_types}>{i18n.example_11}</option>
			<option value={i18n.car_brands}>{i18n.example_12}</option>
		</select>
		<div>{i18n.separated_by_pipe}</div>
	</>
);

export const Options = ({ i18n, data }) => (
	<>
		<div>
			<input type="radio" name="dtListType_%ROW%" id="dtListType1_%ROW%" value="Exactly" checked="checked" />
			<label htmlFor="dtListType1_%ROW%">{i18n.exactly}</label>
			<input type="text" size="2" name="dtListExactly_%ROW%" id="dtListExactly_%ROW%" value="1" />&nbsp;&nbsp;
			<input type="radio" name="dtListType_%ROW%" id="dtListType2_%ROW%" value="AtMost" />
			<label htmlFor="dtListType2_%ROW%">{i18n.at_most}</label>
			<input type="text" size="2" name="dtListAtMost_%ROW%" id="dtListAtMost_%ROW%" value="1" />
		</div>
		<div>
			<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px;" value={data.option} />
		</div>
	</>
);

export const Help = ({ i18n }) => <p>{i18n.help}</p>;


// var _validate = function(rows) {
// 	var missingOptions = {
// 		fields: [],
// 		visibleProblemRows: []
// 	};
// 	var invalidIntFields = {
// 		fields: [],
// 		visibleProblemRows: []
// 	};
//
// 	var intOnly = /^\d+$/;
// 	for (var i=0; i<rows.length; i++) {
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
//
// 		// check the At Most and Exactly fields
// 		var exactlyField = $("#dtListExactly_" + rows[i]);
// 		var exactlyFieldValid = intOnly.test(exactlyField.val());
// 		var atMostField = $("#dtListExactly_" + rows[i]);
// 		var atMostFieldValid  = intOnly.test(atMostField.val());
//
// 		if (!exactlyFieldValid || !atMostFieldValid) {
// 			if (!exactlyFieldValid) {
// 				invalidIntFields.fields.push(exactlyField);
// 			}
// 			if (!atMostFieldValid) {
// 				invalidIntFields.fields.push(atMostField);
// 			}
// 			invalidIntFields.visibleProblemRows.push(visibleRowNum);
// 		}
//
// 		// check the option is filled in
// 		var option = $.trim($("#dtOption_" + rows[i]).val());
// 		if (option === "") {
// 			missingOptions.visibleProblemRows.push(visibleRowNum);
// 			missingOptions.fields.push($("#dtOption_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (missingOptions.visibleProblemRows.length) {
// 		errors.push({ els: missingOptions.fields, error: LANG.incomplete_fields + " <b>" + missingOptions.visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	if (invalidIntFields.visibleProblemRows.length) {
// 		errors.push({ els: invalidIntFields.fields, error: LANG.invalid_int_fields + " <b>" + invalidIntFields.visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

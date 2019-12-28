import * as React from 'react';
import { DataTypeUIHelpProps, DataTypeUIOptionsProps } from '../../../../types/general';

export const state = {
	autoIncRowNum: '',
	maxSiblings: ''
};

export const Options = ({ id, i18n }: DataTypeUIOptionsProps) => (
	<>
		<div>
            {i18n.auto_increment_row_num}
            <input type="text" id={`${id}-rowNum`} value="1" size={3} maxLength={3} /></div>
		<div>
            {i18n.max_num_sibling_nodes}
            <input type="text" id={`${id}-maxSiblings`} value="2" size={3} maxLength={3} />
        </div>
	</>
);

export const Help = ({ i18n }: DataTypeUIHelpProps) => (
	<>
		<p>
			{i18n.help_1}
		</p>
		<p>
			{i18n.help_2}
		</p>
	</>
);

// var _validate = function(rows) {
// 	var visibleProblemRows = [];
// 	var problemFields      = [];
// 	var isInt = /^\d+$/;
// 	for (var i=0; i<rows.length; i++) {
// 		var autoIncRowNum = $.trim($("#dtTreeAutoIncrementRowNum_" + rows[i]).val());
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 		if (autoIncRowNum === "" || !isInt.test(autoIncRowNum)) {
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtTreeAutoIncrementRowNum_" + rows[i]));
// 		}
// 		var maxSiblings = $.trim($("#dtTreeMaxSiblings_" + rows[i]).val());
// 		if (maxSiblings === "" || !isInt.test(maxSiblings)) {
// 			if ($.inArray(visibleRowNum, visibleProblemRows) == -1) {
// 				visibleProblemRows.push(visibleRowNum);
// 			}
// 			problemFields.push($("#dtTreeMaxSiblings_" + rows[i]));
// 		}
// 	}
//
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({ els: problemFields, error: LANG.invalid_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };
//

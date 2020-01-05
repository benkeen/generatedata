import * as React from 'react';
import { HelpProps, OptionsProps } from '../../../../types/dataTypes';

export const state = {
	numWords: 10
};

export const Options = ({ i18n, id, data, onUpdate }: OptionsProps) => {
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLSelectElement).value;
        onUpdate({
            numWords: value
        });
    };

    return (
        <>
            {i18n.TextFixed_generate} #<input type="text" style={{ width: 30 }} value={data.numWords} onChange={onChange}/>
            {i18n.TextFixed_words}
        </>
    );
};

export const Help = ({ i18n }: HelpProps) => <p>{i18n.TextFixed_help}</p>;

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

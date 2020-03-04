import * as React from 'react';
import { DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

type SiretState = {
	example: string;
	option: string;
};

export const initialState: SiretState = {
	example: '',
	option: ''
};

export const Options = ({ id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
		// @ts-ignore
		const value = e.target.value;
		onUpdate({
			...data,
			option: value
		});
	};

	return (
		<>
			<input type="radio" id={`${id}-siret`} value="SIRET" checked={data.option === 'SIRET'} onChange={onChange} />
			<label htmlFor={`${id}-siret`}>SIRET</label>
			<input type="radio" id={`${id}-siren`} value="SIREN" checked={data.option === 'SIREN'} onChange={onChange} />
			<label htmlFor={`${id}-siren`}>SIREN</label>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
		</p>
		<table cellPadding="0" cellSpacing="1">
			<tbody>
				<tr>
					<td><h4>{i18n.SIRET}</h4></td>
					<td>{i18n.type_SIRET}</td>
				</tr>
				<tr>
					<td><h4>{i18n.SIREN}</h4></td>
					<td>{i18n.type_SIREN}</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td><h4>{i18n.more_info}</h4></td>
					<td><a href={i18n.help_link} target="_blank" rel="noopener noreferrer">WIKI SIRET</a></td>
				</tr>
			</tbody>
		</table>
	</>
);

// var _exampleChange = function (msg) {
// 	$("input[name='dtOption_" + msg.rowID + "'][value='" + msg.value + "']").prop('checked', true);
// };


/**
 * Called when the user submits the form to generate some data. If the selected data set contains
 * one or more rows of this data type, this function is called with the list of row numbers. Note that
 * the row numbers passed are the *original* row numbers of the rows on creation. It's possible that the
 * user has re-sorted or deleted some rows. So to get the visible row number for a row, call
 * gen._getVisibleRowOrderByRowNum(row)
 */
// var _validate = function (rows) {
// 	var visibleProblemRows = [];
// 	var problemFields = [];
// 	for (var i = 0; i < rows.length; i++) {
// 		if ($("#dtOption_" + rows[i]).val() === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtOption_" + rows[i]));
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

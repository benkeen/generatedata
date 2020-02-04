import * as React from 'react';

export type CSVSettings = {
    delimiter: string;
	lineEndings: 'Windows' | 'Unix' | 'Mac';
};

const state: CSVSettings = {
	delimiter: ',',
	lineEndings: 'Unix'
};

export const Settings = ({ i18n }) => (
	<table cellSpacing="0" cellPadding="0" width="100%">
		<tr>
			<td width="50%">
				<table cellSpacing="2" cellPadding="0" width="100%">
					<tr>
						<td width="160">{i18n.delimiter_chars}</td>
						<td>
							<input type="text" size="2" name="etCSV_delimiter" id="etCSV_delimiter" value="|" />
						</td>
					</tr>
				</table>
			</td>
			<td width="50%">
				<table cellSpacing="0" cellPadding="0" width="100%">
					<tr>
						<td width="160">{i18n.eol_char}</td>
						<td>
							<select name="etCSV_lineEndings" id="etCSV_lineEndings">
								<option value="Windows">Windows</option>
								<option value="Unix">Unix</option>
								<option value="Mac">Mac</option>
							</select>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
);



/*
var _validate = function () {
	var delimiterField = $("#etCSV_delimiter");
	var errors = [];

	// note we don't trim it. I figure whitespace could, technically be used as a delimiter
	if (delimiterField.val() === "") {
		errors.push({
			els: delimiterField,
			error: LANG.validation_no_delimiter
		});
	}

	return errors;
};
*/
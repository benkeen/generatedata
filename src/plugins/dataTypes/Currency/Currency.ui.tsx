import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import Dropdown from '../../../components/dropdown/Dropdown';

export const initialState = {
	example: '',
	format: '',
	from: '',
	to: '',
	currencySymbol: '',
	currencySymbolLocation: 'prefix'
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (i: any): void => {
		const [format, from, to, currencySymbol, currencySymbolLocation] = i.value.split('|');
		onUpdate({
			example: i.value,
			format,
			from,
			to,
			currencySymbol,
			currencySymbolLocation
		});
	};

	const examples = [
		{
			label: 'US/Canada',
			options: [
				{ value: 'XXX.XX|0.00|100.00|$|prefix', label: '$0.00 -> $100.00' },
				{ value: 'XX,XXX|5000|10000|$|prefix', label: `$5,000 -> $10,000 (${i18n.no_cents})` },
				{ value: 'XXXXX.XX|1000.00|10000.00|$|prefix', label: `$1000.00 -> $10000.00 (${i18n.no_thousand_delimiters})` },
				{ value: 'XXX,XXX.XX|-100000.00|100000.00|$|prefix', label: '-$100,000.00 -> $100,000.00' },
				{ value: 'X.XX|0.00|100.00||prefix', label: `0.01 -> 1.00 (${i18n.no_dollar_sign})` },
				{ value: 'X.XXX.XXX,XX|100.00|1000.00|$|suffix', label: '100,00 $ -> 1.000,00 $ (French Canadian)' },
				{ value: 'XXX XXX|10|100000||prefix', label: '10 -> 100 000' }
			]
		},
		{
			label: 'UK',
			options: [
				{ label: 'XXX.XX|0.00|100.00|£|prefix', value: '£0.00 -> £100.00' }
			]
		},
		{
			label: 'Euro',
			options: [
				{ label: 'XXX,XXX|100000|200000|€|prefix', value: '€100,000 -> €200,000' }
			]
		}
	];

	return (
		<Dropdown
			isGrouped={true}
			value={data.example}
			onChange={onChange}
			options={examples}
		/>
	);
};

export const Options = ({ i18n, data }: DTOptionsProps): JSX.Element => {

	return (
		<>
			<div>
				{i18n.format}: <input type="text" value={data.format} style={{ width: 160 }} />
			</div>
			<div>
				{i18n.range} <input type="text" value={data.from} style={{ width: 80 }} />
				{i18n.to} <input type="text" value={data.to} style={{ width: 80 }} />
			</div>
			<div>
				{i18n.currency_symbol}
				<input type="text" value={data.currencySymbol} style={{ width: 20 }} />
				<select defaultValue={data.currencySymbolLocation}>
					<option value="prefix">{i18n.prefix}</option>
					<option value="suffix">{i18n.suffix}</option>
				</select>
			</div>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tbody>
				<tr>
					<td valign="top"><h4>{i18n.format}</h4></td>
					<td>{i18n.format_desc}</td>
				</tr>
				<tr>
					<td valign="top"><h4>{i18n.range_from}</h4></td>
					<td>{i18n.range_from_desc}</td>
				</tr>
				<tr>
					<td valign="top"><h4>{i18n.range_to}</h4></td>
					<td>{i18n.range_to_desc}</td>
				</tr>
				<tr>
					<td valign="top"><h4>{i18n.currency_symbol}</h4></td>
					<td>{i18n.currency_symbol_desc}</td>
				</tr>
				<tr>
					<td valign="top"><h4>{i18n.prefix_suffix}</h4></td>
					<td>{i18n.prefix_suffix_desc}</td>
				</tr>
			</tbody>
		</table>
	</>
);


// var _exampleChange = function(msg) {
// 	var format = "";
// 	var rangeFrom = "";
// 	var rangeTo = "";
// 	var symbol = "";
// 	var symbolLocation = "";
// 	if (msg.value) {
// 		var parts = msg.value.split("|");
// 		format = parts[0];
// 		rangeFrom = parts[1];
// 		rangeTo = parts[2];
// 		symbol = parts[3];
// 		symbolLocation = parts[4];
// 	}
// 	$("#dtCurrencyFormat_" + msg.rowID).val(format);
// 	$("#dtCurrencyRangeFrom_" + msg.rowID).val(rangeFrom);
// 	$("#dtCurrencyRangeTo_" + msg.rowID).val(rangeTo);
// 	$("#dtCurrencySymbol_" + msg.rowID).val(symbol);
// 	$("#dtCurrencySymbolLocation_" + msg.rowID).val(symbolLocation);
// };

// var _validate = function (rows) {
// 	var problemFields = [];
// 	var problemFields2 = [];
// 	var problemFields3 = [];
// 	var invalidFormatRows = [];
// 	var rowsWithInvalidRange = [];
// 	var fromRangeGreaterThanToRange = [];
//
// 	for (var i = 0; i < rows.length; i++) {
// 		var format = $("#dtCurrencyFormat_" + rows[i]);
// 		var from = $("#dtCurrencyRangeFrom_" + rows[i]);
// 		var to = $("#dtCurrencyRangeTo_" + rows[i]);
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
//
// 		if ($.trim(format.val()) === "") {
// 			invalidFormatRows.push(visibleRowNum);
// 			problemFields.push(format);
// 		}
//
// 		var validFromRange = true;
// 		var validToRange = true;
// 		if (from.val() === "" || from.val().match(/[^\d\.\-]/)) {
// 			rowsWithInvalidRange.push(visibleRowNum);
// 			validFromRange = false;
// 			problemFields2.push(from);
// 		}
// 		if (to.val() === "" || to.val().match(/[^\d\.\-]/)) {
// 			if ($.inArray(visibleRowNum, rowsWithInvalidRange) === -1) {
// 				rowsWithInvalidRange.push(visibleRowNum);
// 			}
// 			validToRange = false;
// 			problemFields2.push(to);
// 		}
//
// 		if (validFromRange && validToRange) {
// 			var fromNum = parseFloat(from.val());
// 			var toNum = parseFloat(to.val());
//
// 			// allow the same value, just in case users want to have the same currency outputted for all
// 			// rows (you never know)
// 			if (fromNum > toNum) {
// 				fromRangeGreaterThanToRange.push(visibleRowNum);
// 				problemFields3.push(from);
// 			}
// 		}
// 	}
//
// 	var errors = [];
// 	if (invalidFormatRows.length) {
// 		errors.push({
// 			els: problemFields,
// 			error: LANG.incomplete_fields + " <b>" + invalidFormatRows.join(", ") + "</b>"
// 		});
// 	}
// 	if (rowsWithInvalidRange.length) {
// 		errors.push({
// 			els: problemFields2,
// 			error: LANG.invalid_range_fields + " <b>" + rowsWithInvalidRange.join(", ") + "</b>"
// 		});
// 	}
// 	if (fromRangeGreaterThanToRange.length) {
// 		errors.push({
// 			els: problemFields3,
// 			error: LANG.invalid_range + " <b>" + fromRangeGreaterThanToRange.join(", ") + "</b>"
// 		});
// 	}
//
// 	return errors;
// };
//

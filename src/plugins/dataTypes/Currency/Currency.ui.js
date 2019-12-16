import React from 'react';

export const state = {
	example: '',
	format: '',
	from: '',
	to: '',
	currencySymbol: '',
	currencySymbolLocation: 'prefix'
};

export const Example = ({ i18n, data, onUpdate }) => {
	const onChange = (e) => {
		onUpdate({
			...data,
			example: e.target.value
		});
	};

	return (
		<select defaultValue={data.example} onChange={onChange}>
			<option value="">{i18n.please_select}</option>
			<optgroup label="US/Canada">
				<option value="XXX.XX|0.00|100.00|$|prefix">$0.00 -&gt; $100.00</option>
				<option value="XX,XXX|5000|10000|$|prefix">$5,000 -&gt; $10,000 ({i18n.no_cents})</option>
				<option value="XXXXX.XX|1000.00|10000.00|$|prefix">$1000.00 -&gt; $10000.00 ({i18n.no_thousand_delimiters})</option>
				<option value="XXX,XXX.XX|-100000.00|100000.00|$|prefix">-$100,000.00 -&gt; $100,000.00</option>
				<option value="X.XX|0.00|100.00||prefix">0.01 -&gt; 1.00 ({i18n.no_dollar_sign})</option>
				<option value="X.XXX.XXX,XX|100.00|1000.00|$|suffix">100,00 $ -&gt; 1.000,00 $ (French Canadian)</option>
				<option value="XXX XXX|10|100000||prefix">10 -&gt; 100 000</option>
			</optgroup>
			<optgroup label="UK">
				<option value="XXX.XX|0.00|100.00|£|prefix">£0.00 -&gt; £100.00</option>
			</optgroup>
			<optgroup label="Euro">
				<option value="XXX,XXX|100000|200000|€|prefix">€100,000 -&gt; €200,000</option>
			</optgroup>
		</select>
	);
};

export const Options = ({ i18n, data }) => (
	<>
		<div>
			{i18n.format}: <input type="text" id="dtCurrencyFormat_%ROW%" name="dtCurrencyFormat_%ROW%" style={{ width: 160 }} />
		</div>
		<div>
			{i18n.range} <input type="text" value={data.from} style="width:80px"/>
			{i18n.to} <input type="text" value={data.to} style="width:80px"/>
		</div>
		<div>
			{i18n.currency_symbol}
			<input type="text" value={data.currencySymbol} style="width: 20px"/>
			<select defaultValue={data.currencySymbolLocation}>
				<option value="prefix">{i18n.prefix}</option>
				<option value="suffix">{i18n.suffix}</option>
			</select>
		</div>
	</>
);

export const Help = ({ i18n }) => (
	<>
		<p>
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td width="120" valign="top"><h4>{i18n.format}</h4></td>
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

import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import styles from './Currency.scss';

export const initialState = {
	example: 'XXX.XX|0.00|100.00|$|prefix',
	format: 'XXX.XX',
	from: '0.00',
	to: '100.00',
	currencySymbol: '$',
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
				{ value: 'XX,XXX|5000|10000|$|prefix', label: `$5,000 -> $10,000 (${i18n.noCents})` },
				{ value: 'XXXXX.XX|1000.00|10000.00|$|prefix', label: `$1000.00 -> $10000.00 (${i18n.noThousandDelimiters})` },
				{ value: 'XXX,XXX.XX|-100000.00|100000.00|$|prefix', label: '-$100,000.00 -> $100,000.00' },
				{ value: 'X.XX|0.00|100.00||prefix', label: `0.01 -> 1.00 (${i18n.noDollarSign})` },
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
			{i18n.helpIntro}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.format}</label>
			</div>
			<div className={styles.col2}>{i18n.formatDesc}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.rangeFrom}</label>
			</div>
			<div className={styles.col2}>{i18n.rangeFromDesc}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.rangeTo}</label>
			</div>
			<div className={styles.col2}>{i18n.rangeToDesc}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.currencySymbol}</label>
			</div>
			<div className={styles.col2}>{i18n.currencySymbolDesc}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.prefixSuffix}</label>
			</div>
			<div className={styles.col2}>{i18n.prefixSuffixDesc}</div>
		</div>
	</>
);

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

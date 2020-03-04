import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import Dropdown, { DropdownOption } from '../../../components/dropdown/Dropdown';
import { creditCardList, creditCardFormats } from './formats';

export type PanState = {
	example: string;
	separator: string;
	formats: string;
	randomBrands: string[];
};

export const initialState: PanState = {
	example: 'mastercard',
	separator: ' ',
	formats: '',
	randomBrands: []
};

export const getCreditCardOptions = (formats: string[], i18n: any): DropdownOption[] => {
	return formats.map((format) => ({
		value: format, label: i18n[format]
	}));
};

export const getFormattedCreditCardFormats = (ccType: string, separator: string): string => {
	// @ts-ignore-line
	return creditCardFormats[ccType].formats.join('\n').replace(/ /g, separator);
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): React.ReactNode => {
	const onChange = (value: string): void => {
		const newData: Partial<PanState> = {
			...data,
			example: value
		};
		if (value === 'rand_card') { 
			newData.randomBrands = creditCardList;
		} else {
			newData.formats = getFormattedCreditCardFormats(value, data.separator);
		}
		onUpdate(newData);
	};

	const options = getCreditCardOptions(creditCardList, i18n);
	options.push({ value: 'rand_card', label: i18n.rand_card });

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ data, i18n, onUpdate }: DTOptionsProps): React.ReactNode => {
	const options = getCreditCardOptions(creditCardList, i18n);

	const onChangeRandomOption = (randomBrands: any): void => {
		onUpdate({
			...data,
			randomBrands: randomBrands === null ? [] : randomBrands.map((row: any) => row.value)
		});
	};

	const onChangeSeparator = (separator: string): void => {
		const newData = {
			...data,
			separator
		};
		if (data.example !== 'rand_data') {
			newData.formats = getFormattedCreditCardFormats(data.example, separator);
		}
		onUpdate(newData);
	};

	const getCCFormats = (): JSX.Element | null => {
		if (data.example === 'rand_card') {
			return null;
		}
		return (
			<div>
				{i18n.ccformats}
				<textarea
					title={i18n.format_title}
					style={{ height: 80, width: '100%' }} 
					value={data.formats}
					onChange={(e: any): void => onUpdate({
						...data,
						formats: e.target.value
					})}
				/>
			</div>
		);
	};

	const getRandomOptions = (): JSX.Element | null => {
		if (data.example !== 'rand_card') {
			return null;
		}
		const selected = getCreditCardOptions(data.randomBrands, i18n);

		// title={i18n.rand_brand_title} style={{ height: 100, width: '100%' }}
		return (
			<Dropdown
				isMulti
				closeMenuOnSelect={false}
				isClearable={false}
				defaultValue={selected}
				value={selected}
				onChange={onChangeRandomOption}
				options={options}
			/>
		);
	};

	return (
		<>
			<div style={{ marginBottom: 4 }}>
				<span>{i18n.separators}</span>
				<input
					type="text"
					style={{ width: 30 }}
					value={data.separator}
					title={i18n.separator_help}
					onChange={(e: any): void => onChangeSeparator(e.target.value)}
				/>
			</div>
			{getCCFormats()}
			{getRandomOptions()}
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<p>
		{i18n.DESC}
		{i18n.pan_help_intro}
		<b>{i18n.mastercard}</b>, <b>{i18n.visa}</b>, <b>{i18n.visa_electron}</b>,
		<b>{i18n.americanexpress}</b>, <b>{i18n.discover}</b>, <b>{i18n.american_diners}</b>,
		<b>{i18n.carte_blanche}</b>, <b>{i18n.diners_club_international}</b>, <b>{i18n.enroute}</b>,
		<b>{i18n.jcb}</b>, <b>{i18n.maestro}</b>, <b>{i18n.solo}</b>,
		<b>{i18n.switch}</b>, <b>{i18n.laser}</b>.
	</p>
);


// var _validate = function(rows) {
// 	var cardTypeProblemVisibleRows = [];
// 	var cardTypeProblemFields      = [];
// 	var cardFormatProblemVisibleRows = [];
// 	var cardFormatProblemFields      = [];
// 	var randCardSelectProblemVisibleRows = [];
// 	var randCardSelectProblemFields      = [];
//
// 	for (var i=0; i<rows.length; i++) {
//
// 		// check if the examples dropdown (card type) isn't blank
// 		var $exampleField = $("#dtExample_" + rows[i]);
// 		if ($exampleField.val() === "") {
// 			cardTypeProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 			cardTypeProblemFields.push($exampleField);
// 		}
//
// 		// check if card format is proper
// 		var format = $("#dtOption_" + rows[i]).val();
// 		if (format.match(/[^X\s]/g)) {
// 			cardFormatProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 			cardFormatProblemFields.push($("#dtOption_" + rows[i]));
// 		}
//
// 		// check if random card is selected then at least one type should be selected
// 		if ($exampleField.val() === "rand_card") {
// 			var selected = $("#dtOptionPAN_randomCardFormat_" + rows[i]).val();
// 			if (selected === null) {
// 				randCardSelectProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 				randCardSelectProblemFields.push($("#dtOptionPAN_randomCardFormat_" + rows[i]));
// 			}
// 		}
// 	}
//
// 	var errors = [];
// 	if (cardTypeProblemVisibleRows.length) {
// 		errors.push({ els: cardTypeProblemFields, error: LANG.pan_incomplete_fields + " <b>" + cardTypeProblemVisibleRows.join(", ") + "</b>"});
// 	}
// 	if (cardFormatProblemVisibleRows.length) {
// 		errors.push({ els: cardFormatProblemFields, error: LANG.format_incomplete_fields + " <b>" + cardFormatProblemVisibleRows.join(", ") + "</b>"});
// 	}
// 	if (randCardSelectProblemVisibleRows.length) {
// 		errors.push({ els: randCardSelectProblemFields, error: LANG.pan_incomplete_fields + " <b>" + randCardSelectProblemVisibleRows.join(", ") + "</b>"});
// 	}
//
// 	return errors;
// };

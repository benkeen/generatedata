import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '~types/dataTypes';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import { creditCardList, creditCardFormats } from './formats';

export type PanState = {
	example: string;
	formats: string[];
	randomBrands: string[];
};

export const initialState: PanState = {
	example: 'mastercard',
	formats: [],
	randomBrands: []
};

export const getCreditCardOptions = (formats: string[], i18n: any): DropdownOption[] => {
	return formats.map((format) => ({
		value: format,
		label: i18n[format]
	}));
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): React.ReactNode => {
	const onChange = (value: string): void => {
		const newData: Partial<PanState> = {
			...data,
			example: value
		};

		console.log({ value });

		if (value === 'rand_card') {
			newData.randomBrands = creditCardList;
		} else {
			// @ts-ignore-line
			newData.formats = creditCardFormats[value].formats;
		}
		onUpdate(newData);
	};

	console.log(creditCardList);

	const options = getCreditCardOptions(creditCardList, i18n);
	options.push({ value: 'rand_card', label: i18n.randCard });

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

	const getCCFormats = (): JSX.Element | null => {
		if (data.example === 'rand_card') {
			return null;
		}

		return (
			<CreatablePillField
				value={data.formats}
				onChange={(formats: any): void => onUpdate({ ...data, formats })}
			/>
		);
	};

	const getRandomOptions = (): JSX.Element | null => {
		if (data.example !== 'rand_card') {
			return null;
		}
		const selected = getCreditCardOptions(data.randomBrands, i18n);

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
			{getCCFormats()}
			{getRandomOptions()}
		</>
	);
};


export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<p dangerouslySetInnerHTML={{ __html: `${i18n.DESC} ${i18n.panHelpIntro}` }} />
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

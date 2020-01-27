import * as React from 'react';
import { ExampleProps, HelpProps, OptionsProps } from '../../../../types/dataTypes';
import Dropdown from '../../../components/dropdown/Dropdown';
import { creditCardFormats } from './formats';

export const state = {
	example: 'mastercard',
	digit: '',
	separator: ' ',
	format: '',
	randomBrands: '' // check type
};


export const Example = ({ i18n, data, onUpdate }: ExampleProps): React.ReactNode => {
	const onChange = (value: string): void => {

		// @ts-ignore-line
		const format = (value === 'rand_card') ? '' : creditCardFormats[value];

		onUpdate({
			...data,
			example: value,
			format
		});
	};

	const options = [
		{ value: 'mastercard', label: i18n.mastercard },
		{ value: 'visa', label: i18n.visa_electron },
		{ value: 'visaElectron', label: i18n.visa_electron },
		{ value: 'amex', label: i18n.americanexpress },
		{ value: 'discover', label: i18n.discover },
		{ value: 'carteBlanche', label: i18n.carte_blanche },
		{ value: 'dinersClubInt', label: i18n.diners_club_international },
		{ value: 'dinersClubEnRoute', label: i18n.enRoute },
		{ value: 'jcb', label: i18n.jcb },
		{ value: 'maestro', label: i18n.maestro },
		{ value: 'solo', label: i18n.solo },
		{ value: 'switch', label: i18n.switch },
		{ value: 'laser', label: i18n.laser },
		{ value: 'rand_card', label: i18n.rand_card }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ data, i18n }: OptionsProps): React.ReactNode => {
	// const onChange = () => {
	// 	onUpdate({
	// 		...data
	// 	});
	// };

	const getCCFormats = () => {
		return (
			<div>
				{i18n.ccformats}
				<textarea title={i18n.format_title} style={{ height: 80, width: '100%' }} />
			</div>
		);
	}

	const getRandomOption = () => {
		return (
			<div>
				{i18n.ccrandom}
				<select multiple title={i18n.rand_brand_title} style={{ height: 100, width: '100%' }}>
					<option value="mastercard">{i18n.mastercard}</option>
					<option value="visa">{i18n.visa}</option>
					<option value="visaElectron">{i18n.visa_electron}</option>
					<option value="amex">{i18n.americanexpress}</option>
					<option value="discover">{i18n.discover}</option>
					<option value="carteBlanche">{i18n.carte_blanche}</option>
					<option value="dinersClubInt">{i18n.diners_club_international}</option>
					<option value="dinersClubEnRoute">{i18n.enRoute}</option>
					<option value="jcb">{i18n.jcb}</option>
					<option value="maestro">{i18n.maestro}</option>
					<option value="solo">{i18n.solo}</option>
					<option value="switch">{i18n.switch}</option>
					<option value="laser">{i18n.laser}</option>
				</select>
			</div>
		);
	};

	return (
		<>
			<div>
				{i18n.separators}
				<input type="text" style={{ width: 78 }} value={data.separator} title={i18n.separator_help} />
			</div>
			{getCCFormats()}
			{getRandomOption()}
		</>
	);
};

export const Help = ({ i18n }: HelpProps): React.ReactNode => (
	<p>
		{i18n.DATA_TYPE.DESC}
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


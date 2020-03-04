import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import Dropdown from '../../../components/dropdown/Dropdown';
import CreatableDropdown from '../../../components/dropdown/CreatableDropdown';

export type ListType = 'EXACTLY' | 'AT_MOST';

export type ListState = {
	example: string;
	listType: ListType;
	exactly: string;
	atMost: string;
	values: string;
};

export const initialState: ListState = {
	example: '',
	listType: 'EXACTLY',
	exactly: '',
	atMost: '',
	values: ''
};

export const Example = ({ data, onUpdate, i18n }: DTExampleProps): JSX.Element => {
	const onChange = (example: any): void => {
		onUpdate({
			...data,
			example: example,
			values: example
		});
	};

	const options = [
		{ value: '1|3|5|7|9|11|13|15|17|19|21|23|25|27|29|31|33|35|37|39|41|43|45|47|49', label: i18n.example_1 },
		{ value: '2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50', label: i18n.example_2 },
		{ value: '1|2|3|4|5|6|7|8|9|10', label: '1-10' },
		{ value: i18n.one_to_ten, label: i18n.example_3 },
		{ value: '1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97', label: i18n.example_4 },
		{ value: i18n.colours, label: i18n.example_5 },
		{ value: i18n.relationship_states, label: i18n.example_6 },
		{ value: i18n.prefix, label: i18n.example_7 },
		{ value: i18n.company_names, label: i18n.example_8 },
		{ value: i18n.companies, label: i18n.example_9 },
		{ value: i18n.drug_names, label: i18n.example_10 },
		{ value: i18n.food_types, label: i18n.example_11 },
		{ value: i18n.car_brands, label: i18n.example_12 }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ i18n, data, id, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});

		if (field === 'EXACTLY') {

		} else if (field === 'AT_MOST') {

		}
	};

	return (
		<>
			<div style={{ margin: 4 }}>
				<input
					type="radio"
					id={`listType1-${id}`}
					value="EXACTLY"
					checked={data.listType === 'EXACTLY'}
					onChange={(): void => onChange('listType', 'EXACTLY')}
				/>
				<label htmlFor={`listType1-${id}`}>{i18n.exactly}</label>
				<input
					type="text"
					size={2}
					id={`dtListExactly_${id}`}
					value={data.exactly}
					style={{ margin: '0 6px 0 4px' }}
					onChange={(e): void => onChange('exactly', e.target.value)}
				/>
				<input
					type="radio"
					id={`listType2-${id}`}
					value="AT_MOST"
					checked={data.listType === 'AT_MOST'}
					onChange={(): void => onChange('listType', 'AT_MOST')}
				/>
				<label htmlFor={`listType2-${id}`}>{i18n.at_most}</label>
				<input
					type="text"
					size={2}
					id={`dtListAtMost_${id}`}
					value={data.atMost}
					style={{ margin: '0 6px 0 4px' }}
					onChange={(e): void => onChange('atMost', e.target.value)}
				/>
			</div>
			<div>
				<CreatableDropdown />
			</div>
		</>
	);

	/*
		<input
			type="text"
			value={data.values}
			onChange={(e): void => onChange('values', e.target.value)}
			style={{ width: '100%' }}
		/>
	*/
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.help}</p>;

// var _validate = function(rows) {
// 	var missingOptions = {
// 		fields: [],
// 		visibleProblemRows: []
// 	};
// 	var invalidIntFields = {
// 		fields: [],
// 		visibleProblemRows: []
// 	};
//
// 	var intOnly = /^\d+$/;
// 	for (var i=0; i<rows.length; i++) {
// 		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
//
// 		// check the At Most and Exactly fields
// 		var exactlyField = $("#dtListExactly_" + rows[i]);
// 		var exactlyFieldValid = intOnly.test(exactlyField.val());
// 		var atMostField = $("#dtListExactly_" + rows[i]);
// 		var atMostFieldValid  = intOnly.test(atMostField.val());
//
// 		if (!exactlyFieldValid || !atMostFieldValid) {
// 			if (!exactlyFieldValid) {
// 				invalidIntFields.fields.push(exactlyField);
// 			}
// 			if (!atMostFieldValid) {
// 				invalidIntFields.fields.push(atMostField);
// 			}
// 			invalidIntFields.visibleProblemRows.push(visibleRowNum);
// 		}
//
// 		// check the option is filled in
// 		var option = $.trim($("#dtOption_" + rows[i]).val());
// 		if (option === "") {
// 			missingOptions.visibleProblemRows.push(visibleRowNum);
// 			missingOptions.fields.push($("#dtOption_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (missingOptions.visibleProblemRows.length) {
// 		errors.push({ els: missingOptions.fields, error: LANG.incomplete_fields + " <b>" + missingOptions.visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	if (invalidIntFields.visibleProblemRows.length) {
// 		errors.push({ els: invalidIntFields.fields, error: LANG.invalid_int_fields + " <b>" + invalidIntFields.visibleProblemRows.join(", ") + "</b>"});
// 	}
// 	return errors;
// };

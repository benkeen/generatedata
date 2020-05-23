import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import Dropdown, { DropdownOption } from '../../../components/dropdown/Dropdown';
import CreatablePillField, { createOption } from '../../../components/CreatablePillField';


export type ListType = 'exactly' | 'atMost';

export type ListState = {
	example: string;
	listType: ListType;
	exactly: number;
	atMost: number;
	values: DropdownOption[];
};

export const initialState: ListState = {
	example: '',
	listType: 'exactly',
	exactly: 1,
	atMost: 1,
	values: []
};

export const Example = ({ data, onUpdate, i18n }: DTExampleProps): JSX.Element => {
	const onChange = (example: any): void => {
		onUpdate({
			...data,
			example: example,
			values: example.split('|')
		});
	};

	const options = [
		{ value: '1|3|5|7|9|11|13|15|17|19|21|23|25|27|29|31|33|35|37|39|41|43|45|47|49', label: i18n.example1 },
		{ value: '2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50', label: i18n.example2 },
		{ value: '1|2|3|4|5|6|7|8|9|10', label: '1-10' },
		{ value: i18n.oneToTen, label: i18n.example3 },
		{ value: '1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97', label: i18n.example4 },
		{ value: i18n.colours, label: i18n.example5 },
		{ value: i18n.relationshipStates, label: i18n.example6 },
		{ value: i18n.prefix, label: i18n.example7 },
		{ value: i18n.companyNames, label: i18n.example8 },
		{ value: i18n.companies, label: i18n.example9 },
		{ value: i18n.drugNames, label: i18n.example10 },
		{ value: i18n.foodTypes, label: i18n.example11 },
		{ value: i18n.carBrands, label: i18n.example12 }
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
	const exactlyField = React.useRef<any>();
	const atMostField = React.useRef<any>();

	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});

		if (field === 'exactly') {

		} else if (field === 'atMost') {

		}
	};

	return (
		<>
			<div style={{ margin: 4 }}>
				<input
					type="radio"
					id={`listType1-${id}`}
					value="exactly"
					checked={data.listType === 'exactly'}
					onChange={(): void => {
						onChange('listType', 'exactly');
						exactlyField.current.focus();
					}}
				/>
				<label htmlFor={`listType1-${id}`}>{i18n.exactly}</label>
				<input
					ref={exactlyField}
					type="number"
					id={`dtListExactly_${id}`}
					value={data.exactly}
					style={{ margin: '0 6px 0 4px', width: 50 }}
					onChange={(e): void => {
						onChange('exactly', e.target.value);
						onChange('listType', 'exactly');
					}}
				/>
				<input
					type="radio"
					id={`listType2-${id}`}
					value="atMost"
					checked={data.listType === 'atMost'}
					onChange={(): void => {
						onChange('listType', 'atMost');
						atMostField.current.focus();
					}}
				/>
				<label htmlFor={`listType2-${id}`}>{i18n.atMost}</label>
				<input
					ref={atMostField}
					type="number"
					id={`dtListAtMost_${id}`}
					value={data.atMost}
					style={{ margin: '0 6px 0 4px', width: 50 }}
					onChange={(e): void => {
						onChange('atMost', e.target.value);
						onChange('listType', 'atMost');
					}}
				/>
			</div>
			<div>
				<CreatablePillField
					value={data.values}
					onChange={(rows: any) => {
						onUpdate({
							...data,
							values: rows.map(({ value }: DropdownOption) => value)
						});
					}}
				/>
			</div>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p dangerouslySetInnerHTML={{ __html: i18n.help }} />;

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

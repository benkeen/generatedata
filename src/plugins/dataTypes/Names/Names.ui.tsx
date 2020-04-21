import * as React from 'react';
import Dropdown, { DropdownOption } from '../../../components/dropdown/Dropdown';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import styles from './Names.scss';

export type NamesState = {
	example: string;
	options: string;
};

export const initialState: NamesState = {
	example: 'Name Surname',
	options: 'Name Surname'
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (selected: DropdownOption): void => {
		onUpdate({
			...data,
			example: selected.value,
			options: selected.value
		});
	};

	const options = [
		{ value: 'Name Surname', label: i18n.example_Name_Surname },
		{ value: 'Name', label: i18n.example_Name },
		{ value: 'MaleName', label: i18n.example_MaleName },
		{ value: 'FemaleName', label: i18n.example_FemaleName },
		{ value: 'MaleName Surname', label: i18n.example_MaleName_Surname },
		{ value: 'FemaleName Surname', label: i18n.example_FemaleName_Surname },
		{ value: 'Name Initial. Surname', label: i18n.example_Name_Initial_Surname },
		{ value: 'Surname', label: i18n.example_surname },
		{ value: 'Surname, Name Initial.', label: i18n.example_Surname_Name_Initial },
		{ value: 'Name, Name, Name, Name', label: i18n.example_Name4 },
		{ value: 'Name Surname|Name Initial. Surname', label: i18n.example_fullnames },
	];

	return (
		<Dropdown
			value={data.example}
			options={options}
			onChange={onChange}
		/>
	);
};

export const Options = ({ data, onUpdate }: DTOptionsProps): JSX.Element => (
	<input
		type="text"
		value={data.options}
		onChange={(e): void => onUpdate({ ...data, options: e.target.value })}
		style={{ width: '100%' }}
	/>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
			{i18n.help_intro}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>Name</label>
			</div>
			<div className={styles.col2}>{i18n.type_Name}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>MaleName</label>
			</div>
			<div className={styles.col2}>{i18n.type_MaleName}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>FemaleName</label>
			</div>
			<div className={styles.col2}>{i18n.type_FemaleName}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>Initial</label>
			</div>
			<div className={styles.col2}>{i18n.type_Initial}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>Surname</label>
			</div>
			<div className={styles.col2}>{i18n.type_Surname}</div>
		</div>
	</>
);


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

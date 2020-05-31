import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';
import { DTExampleProps, DTOptionsProps, DTHelpProps } from '../../../../types/dataTypes';
import styles from './Alphanumeric.scss';

export type AlphanumericState = {
	example: string;
	value: string;
}

export const initialState: AlphanumericState = {
	example: 'LLLxxLLLxLL',
	value: 'LLLxxLLLxLL'
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: 'LxL xLx', label: `V6M 4C1 ${i18n.exampleCanPostalCode}` },
		{ value: 'xxxxx', label: `90210 ${i18n.exampleUSZipCode}` },
		{ value: 'LLLxxLLLxLL', label: `eZg29gdF5K1 ${i18n.examplePassword}` }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ data, onUpdate }: DTOptionsProps): JSX.Element => (
	<input
		type="text"
		value={data.value}
		onChange={(e): void => onUpdate({ ...data, value: e.target.value })}
		style={{ width: '100%' }}
	/>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.helpIntro}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}><label>L</label></div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help1 }} />
			<div className={styles.col3}><label>V</label></div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help2 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}><label>l</label></div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help3 }} />
			<div className={styles.col3}><label>v</label></div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help4 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}><label>D</label></div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help5 }} />
			<div className={styles.col3}><label>F</label></div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help6 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}><label>C</label></div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help7 }} />
			<div className={styles.col3}><label>x</label></div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help8 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}><label>c</label></div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help9 }} />
			<div className={styles.col3}><label>X</label></div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help10 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}><label>E</label></div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help11 }} />
			<div className={styles.col3}><label>H</label></div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help12 }} />
		</div>
	</>
);


// export const validate = (rows, coreI18n) => {
// 	var visibleProblemRows = [];
// 	var problemFields = [];
//
// 	for (var i = 0; i < rows.length; i++) {
// 		var currEl = $("#dtOption_" + rows[i]);
// 		if ($.trim(currEl.val()) === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push(currEl);
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({
// 			els: problemFields,
// 			error: i18n.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"
// 		});
// 	}
// 	return errors;
// };

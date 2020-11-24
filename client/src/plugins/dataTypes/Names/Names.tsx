import * as React from 'react';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import CopyToClipboard from '~components/copyToClipboard/CopyToClipboard';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import styles from './Names.scss';

export type NamesState = {
	example: string;
	options: string[];
};

export const initialState: NamesState = {
	example: 'Name Surname',
	options: ['Name Surname']
};

export const rowStateReducer = (state: NamesState): string[] => state.options;

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (selected: DropdownOption): void => {
		onUpdate({
			example: selected.value,
			options: selected.value.split('|')
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
		{ value: 'Name Surname|Name Initial. Surname', label: i18n.example_fullnames }
	];

	return (
		<Dropdown
			value={data.example}
			options={options}
			onChange={onChange}
		/>
	);
};

export const Options = ({ data, onUpdate }: DTOptionsProps): JSX.Element => {
	return (
		<CreatablePillField
			value={data.options}
			onChange={(options: any): void => onUpdate({ ...data, options })}
		/>
	);
};

const Copy = ({ content, message, tooltip }: any): JSX.Element => (
	<span className={styles.copy}>
		<CopyToClipboard
			tooltip={tooltip}
			content={content}
			message={message}
		/>
	</span>
);

export const Help = ({ coreI18n, i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC} {i18n.help_intro}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>Name</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="Name" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>{i18n.type_Name}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>MaleName</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="MaleName" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>{i18n.type_MaleName}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>FemaleName</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="FemaleName" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>{i18n.type_FemaleName}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>Initial</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="Initial" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>{i18n.type_Initial}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>Surname</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="Surname" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>{i18n.type_Surname}</div>
		</div>
	</>
);

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

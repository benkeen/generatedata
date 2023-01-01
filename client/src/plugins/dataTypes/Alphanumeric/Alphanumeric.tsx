import * as React from 'react';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import CopyToClipboard from '~components/copyToClipboard/CopyToClipboard';
import { DTExampleProps, DTOptionsProps, DTHelpProps, DTMetadata } from '~types/dataTypes';
import { AlphanumericState, GenerationOptionsType } from './Alphanumeric.state';
import styles from './Alphanumeric.scss';
import sharedStyles from '../../../styles/shared.scss';

const Copy = ({ content, tooltip, message }: any): JSX.Element => (
	<span className={styles.copy}>
		<CopyToClipboard
			content={content}
			message={message}
			tooltip={tooltip}
		/>
	</span>
);

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

export const Options = ({ coreI18n, data, throttle, onUpdate }: DTOptionsProps): JSX.Element => {
	const titleColError = data.value.trim() === '' ? coreI18n.requiredField : '';

	return (
		<TextField
			error={titleColError}
			value={data.value}
			onChange={(e: any): void => onUpdate({ ...data, value: e.target.value })}
			style={{ width: '100%' }}
			throttle={throttle}
		/>
	);
};
Options.defaultProps = {
	throttle: true
};

export const Help = ({ coreI18n, i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.helpIntro}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label className={sharedStyles.pill}>L</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="L" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help1 }} />
			<div className={styles.col3}>
				<label className={sharedStyles.pill}>V</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="V" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help2 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label className={sharedStyles.pill}>l</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="l" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help3 }} />
			<div className={styles.col3}>
				<label className={sharedStyles.pill}>v</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="v" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help4 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label className={sharedStyles.pill}>D</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="D" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help5 }} />
			<div className={styles.col3}>
				<label className={sharedStyles.pill}>F</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="F" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help6 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label className={sharedStyles.pill}>C</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="C" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help7 }} />
			<div className={styles.col3}>
				<label className={sharedStyles.pill}>x</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="x" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help8 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label className={sharedStyles.pill}>c</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="c" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help9 }} />
			<div className={styles.col3}>
				<label className={sharedStyles.pill}>X</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="X" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help10 }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label className={sharedStyles.pill}>E</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="E" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.help11 }} />
			<div className={styles.col3}>
				<label className={sharedStyles.pill}>H</label>
			</div>
			<div className={sharedStyles.copyCol}>
				<Copy content="H" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
			</div>
			<div className={styles.col4} dangerouslySetInnerHTML={{ __html: i18n.help12 }} />
		</div>
	</>
);

export const rowStateReducer = (state: AlphanumericState): GenerationOptionsType => ({ value: state.value });

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

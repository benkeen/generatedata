import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import CopyToClipboard from '~components/copyToClipboard/CopyToClipboard';
import sharedStyles from '../../../styles/shared.scss';
import styles from './Computed.scss';

const Copy = ({ content, message, tooltip }: any): JSX.Element => (
	<span className={styles.copy}>
		<CopyToClipboard
			tooltip={tooltip}
			content={content}
			message={message}
		/>
	</span>
);

export const Example = ({ coreI18n }: DTExampleProps): JSX.Element => (
	<div className={sharedStyles.emptyCol}>{coreI18n.seeHelpDialog}</div>
);

export const Options = ({ data, onUpdate }: DTOptionsProps): JSX.Element => (
	<textarea
		onChange={(e): void => onUpdate({ value: e.target.value })}
		value={data.value}
		style={{ width: '100%' }}
	/>
);

export const Help = ({ coreI18n, i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{'{{ROW1}}'}, {'{{ROW2}}'}, ...</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="{{ROW1}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>
				{i18n.rowPlaceholder}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{'{{ROWNUM}}'}</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="{{ROWNUM}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>
				{i18n.rowNumPlaceholder}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{'{{ROWDATA1}}'}, ...</label>
			</div>
			<div className={styles.copyCol}>
				<Copy content="{{ROWDATA1}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
			<div className={styles.col2}>
				{i18n.additionalInfo}
				<ul>
					<li><label>{'{{ROWDATA1.colIndex}}'}</label> - {i18n.colIndex}</li>
					<li><label>{'{{ROWDATA1.id}}'}</label> - {i18n.randomUniqueId}</li>
					<li><label>{'{{ROWDATA1.dataType}}'}</label> - {i18n.dataType}</li>
					<li><label>{'{{ROWDATA1.data}}'}</label> - {i18n.generateDataObj}</li>
				</ul>

				{i18n.objExpl}
				<label>{'{{JSON.stringify(ROWDATA1)}}'}</label>
				<Copy content="{{JSON.stringify(ROWDATA1)}}" message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard}/>
			</div>
		</div>

		<p dangerouslySetInnerHTML={{ __html: i18n.compositeHelp3 }} />

		<ul>
			<li dangerouslySetInnerHTML={{ __html: i18n.compositeHelp4 }} />
			<li>{i18n.compositeHelp5}
				<ul>
					<li><b>{'{{ROW2-ROW1}}'}</b> - {i18n.compositeSubtraction}</li>
					<li><b>{'{{ROW2*ROW1}}'}</b> - {i18n.compositeMultiplication}</li>
					<li><b>{'{{ROW2/ROW1}}'}</b> - {i18n.compositeDivision}</li>
				</ul>
			</li>
			<li>
				{i18n.compositeHelp6}
				<b>{'{{ROW1 % 2 ? "even" : ROW2}}'}</b>
			</li>
		</ul>
	</>
);

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL'
	}
});

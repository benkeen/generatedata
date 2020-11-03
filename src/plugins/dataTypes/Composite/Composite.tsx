import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import sharedStyles from '../../../styles/shared.scss';

export const initialState = {
	value: ''
};

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

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
		</p>
		<p dangerouslySetInnerHTML={{ __html: i18n.compositeHelp2 }} />
		<p dangerouslySetInnerHTML={{ __html: i18n.compositeHelp3 }} />

		<ul>
			<li dangerouslySetInnerHTML={{ __html: i18n.compositeHelp4 }} />
			<li>{i18n.compositeHelp5}
				<ul>
					<li><b>{`{{ROW2-ROW1}}`}</b> - {i18n.compositeSubtraction}</li>
					<li><b>{`{{ROW2*ROW1}}`}</b> - {i18n.compositeMultiplication}</li>
					<li><b>{`{{ROW2/ROW1}}`}</b> - {i18n.compositeDivision}</li>
				</ul>
			</li>
			<li>
				{i18n.compositeHelp6}
				<b>{`{{ROW1 % 2 ? "even" : ROW2}}`}</b>
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

import * as React from 'react';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';

export const Options = ({ i18n, data, id, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, checked: boolean): void => {
		onUpdate({
			...data,
			[field]: checked
		});
	};

	return (
		<div style={{ margin: '5px 0' }}>
			<input type="checkbox" id={`${id}-lat`} checked={data.lat}
				onChange={(e): void => onChange('lat', e.target.checked)} />
			<label htmlFor={`${id}-lat`}>{i18n.latitude}</label>
			<input type="checkbox" id={`${id}-lng`} checked={data.lng}
				onChange={(e): void => onChange('lng', e.target.checked)} />
			<label htmlFor={`${id}-lng`}>{i18n.longitude}</label>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.DESC}</p>;

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(30) default NULL',
		field_Oracle: 'varchar2(30) default NULL',
		field_MSSQL: 'VARCHAR(30) NULL'
	}
});

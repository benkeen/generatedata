import * as React from 'react';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { DTMetadata, DTOptionsProps } from '~types/dataTypes';

export const Options = ({ i18n, id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const options = [
		{ value: '12345678-9', label: '12345678-9' },
		{ value: '12.345.678-9', label: '12.345.678-9' },
		{ value: '123456789', label: '123456789' },
		{ value: '12.345.6789', label: '12.345.6789' },
		{ value: '12345678', label: '12345678' },
		{ value: '12.345.678', label: '12.345.678' },
		{ value: '9', label: `9 (${i18n.onlyDigit})` }
	];

	const onChange = (field: string, value: string | boolean): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	// the uppercase checkbox only applies to formats that include the final digit
	const getUppercaseCheckbox = (): JSX.Element | null=> {
		if (data.formatCode === '12345678' || data.formatCode === '12.345.678') {
			return null;
		}

		return (
			<div style={{ flex: '0 0 auto' }}>
				<input type="checkbox" id={`${id}-upper`} checked={data.uppercaseDigit}
					onChange={(e): void => onChange('uppercaseDigit', e.target.checked)} />
				<label htmlFor={`${id}-upper`}>{i18n.digitUppercase}</label>
			</div>
		);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ flex: 1 }}>
				<Dropdown
					value={data.formatCode}
					options={options}
					onChange={({ value }: DropdownOption): any => onChange('formatCode', value)}
				/>
			</div>
			{getUppercaseCheckbox()}
		</div>
	);
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(15) default NULL',
		field_Oracle: 'varchar2(15) default NULL',
		field_MSSQL: 'VARCHAR(15) NULL'
	}
});

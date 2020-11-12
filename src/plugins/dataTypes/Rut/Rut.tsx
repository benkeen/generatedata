import * as React from 'react';
import { DTMetadata, DTOptionsProps } from '~types/dataTypes';

type FormatCode = 'xxxxxxxx-y' | 'xxxxxxxx' | 'y';
type RutState = {
	example: string;
	formatCode: FormatCode;
	thousandSep: boolean;
	upper: boolean;
	remDash: boolean;
};

export const initialState: RutState = {
	example: '',
	formatCode: 'xxxxxxxx-y',
	thousandSep: true,
	upper: true,
	remDash: true
};

export const Options = ({ coreI18n, i18n, id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string | boolean): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<>
			<div>
				Format:
				<select onChange={(e): void => onChange('formatCode', e.target.value)}>
					<option value="xxxxxxxx-y">12345678-9 ({i18n.rutDefault})</option>
					<option value="xxxxxxxx">12345678 ({i18n.onlyNumber})</option>
					<option value="y">9 ({i18n.onlyDigit})</option>
				</select>
			</div>

			<input type="checkbox" id={`${id}-thousandSep`} checked={data.thousandSep}
				onChange={(e): void => onChange('thousandSep', e.target.checked)} />
			<label htmlFor={`${id}-thousandSep`}>{i18n.thousandsSeparator}</label><br />
			<input type="checkbox" id={`${id}-upper`} checked={data.upper}
				onChange={(e): void => onChange('upper', e.target.checked)} />
			<label htmlFor={`${id}-upper`}>{i18n.digitUppercase}</label><br />
			<input type="checkbox" id={`${id}-remDash`} checked={data.remDash}
				onChange={(e): void => onChange('remDash', e.target.checked)} />
			<label htmlFor={`${id}-remDash`}>{i18n.removeDash}</label>
		</>
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

import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';


// TODO: figure out what this component IS. Is it for specific countries? Sweden has 12 chars...
// https://en.wikipedia.org/wiki/Personal_identity_number_%28Sweden%29

export const Example = ({ coreI18n, i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: '', label: coreI18n.pleaseSelect },
		{ value: 'PersonalNumberWithoutHyphen', label: i18n.example_PersonalNumberWithoutHyphen },
		{ value: 'PersonalNumberWithHyphen', label: i18n.example_PersonalNumberWithHyphen }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ i18n, data }: DTOptionsProps): JSX.Element => (
	<div>
		{i18n.separators}
		<input type="text" style={{ width: 78 }} value={data.separator} title={i18n.separator_help} />
	</div>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
			{i18n.help_text}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tbody>
				<tr>
					<td><h4>PersonalNumberWithoutHyphen</h4></td>
					<td>{i18n.type_PersonalNumberWithoutHyphen}</td>
				</tr>
				<tr>
					<td><h4>PersonalNumberWithHyphen</h4></td>
					<td>{i18n.type_PersonalNumberWithHyphen}</td>
				</tr>
			</tbody>
		</table>
	</>
);

export const getMetadata = (): DTMetadata => {
	// Called before separator is set, so margin should be used
	// $len = 12 + strlen(static::$sep);
	const len = 13; // should be enough, allow for max one char sep
	return {
		sql: {
			field: `varchar(${len}) default NULL`,
			field_Oracle: `varchar2(${len}) default NULL`,
			field_MSSQL: `VARCHAR(${len}) NULL`
		}
	};
};

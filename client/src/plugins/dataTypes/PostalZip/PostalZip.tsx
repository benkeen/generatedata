import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { countryList } from '../../../../_plugins';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { PostalZipSource } from './PostalZip.state';
import styles from './PostalZip.scss';

const ZipDialog = ({ visible, data, id, onClose, countryI18n, coreI18n, i18n, onUpdate, countryRows, regionRows }: any): JSX.Element => {
	const countryPluginRows = countryRows.map(({ index, id, title }: any) => ({ value: id, label: `${i18n.row} #${index + 1}: ${title}` }));
	const countryPluginRowsExist = countryPluginRows.length > 0;
	const regionPluginRows = regionRows.map(({ index, id, title }: any) => ({ value: id, label: `${i18n.row} #${index + 1}: ${title}` }));
	const regionPluginRowsExist = regionPluginRows.length > 0;

	const onUpdateSource = (source: PostalZipSource): void => {
		const newValues = {
			...data,
			source
		};
		if (source === PostalZipSource.countryRow) {
			newValues.targetRowId = countryPluginRows[0].value;
		}
		if (source === PostalZipSource.regionRow) {
			newValues.targetRowId = regionPluginRows[0].value;
		}
		onUpdate(newValues);
	};

	const onChangeTargetRow = (row: DropdownOption): void => {
		onUpdate({
			...data,
			targetRowId: row.value
		});
	};

	const onSelectCountries = (countries: any): void => {
		onUpdate({
			...data,
			selectedCountries: countries ? countries.map(({ value }: DropdownOption) => value) : []
		});
	};

	const getRegionRowDropdown = (): React.ReactNode => {
		if (data.source !== PostalZipSource.regionRow) {
			return null;
		}

		return (
			<Dropdown
				value={data.targetRowId}
				onChange={onChangeTargetRow}
				options={regionPluginRows}
			/>
		);
	};

	const getCountryPluginDropdown = (): React.ReactNode => {
		if (data.source !== 'countryRow') {
			return null;
		}

		return (
			<Dropdown
				value={data.targetRowId}
				onChange={onChangeTargetRow}
				options={countryPluginRows}
			/>
		);
	};

	const getCountriesDropdown = (): React.ReactNode => {
		if (data.source !== 'countries') {
			return null;
		}

		const countryPluginOptions = countryList.map((countryName) => ({
			value: countryName,
			label: countryI18n[countryName].countryName
		}));

		return (
			<Dropdown
				isMulti
				closeMenuOnSelect={false}
				isClearable={true}
				value={data.selectedCountries}
				onChange={onSelectCountries}
				options={data.source === 'countries' ? countryPluginOptions : countryPluginRows}
			/>
		);
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ maxWidth: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.selectPostalCodes}</DialogTitle>
				<DialogContent dividers>
					<div>
						{i18n.explanation}
					</div>

					<h3>{i18n.source}</h3>

					<RadioPillRow>
						<RadioPill
							label={i18n.anyFormat}
							onClick={(): void => onUpdateSource(PostalZipSource.any)}
							name={`${id}-source`}
							checked={data.source === 'any'}
							tooltip={i18n.anyFormatDesc}
						/>
						<RadioPill
							label={i18n.countries}
							onClick={(): void => onUpdateSource(PostalZipSource.countries)}
							name={`${id}-source`}
							checked={data.source === 'countries'}
							tooltip={i18n.countriesDesc}
						/>
						<RadioPill
							label={i18n.countryRow}
							onClick={(): void => onUpdateSource(PostalZipSource.countryRow)}
							name={`${id}-source`}
							checked={data.source === 'countryRow'}
							disabled={!countryPluginRowsExist}
							tooltip={i18n.countryRowDesc}
						/>
						<RadioPill
							label={i18n.regionRow}
							onClick={(): void => onUpdateSource(PostalZipSource.regionRow)}
							name={`${id}-source`}
							checked={data.source === 'regionRow'}
							disabled={!regionPluginRowsExist}
							tooltip={i18n.regionRowDesc}
						/>
					</RadioPillRow>
					{getCountriesDropdown()}
					{getCountryPluginDropdown()}
					{getRegionRowDropdown()}
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ id, data, coreI18n, i18n, countryI18n, onUpdate, countryRows, regionRows, cityRows }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);
	const numSelected = data.selectedCountries.length;

	let label = '';
	if (data.source === 'any') {
		label = i18n.anyFormat;
	} else if (data.source === 'countries') {
		label = `${i18n.anyPostalZipFrom} <b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.country : i18n.countries);
	} else if (data.source === 'countryRow') {
		const row = countryRows.find((row: any) => row.id === data.targetRowId);
		const rowNum = row.index + 1;
		label = `${i18n.countryRow} #${rowNum}`;
	} else if (data.source === 'regionRow') {
		const row = regionRows.find((row: any) => row.id === data.targetRowId);
		const rowNum = row.index + 1;
		label = `${i18n.regionRow} #${rowNum}`;
	}

	return (
		<div className={styles.buttonLabel}>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				<span dangerouslySetInnerHTML={{ __html: label }} />
			</Button>
			<ZipDialog
				visible={dialogVisible}
				data={data}
				countryRows={countryRows}
				regionRows={regionRows}
				cityRows={cityRows}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				countryI18n={countryI18n}
				onUpdate={onUpdate}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.DESC}</p>;

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(10) default NULL',
		field_Oracle: 'varchar2(10) default NULL',
		field_MSSQL: 'VARCHAR(10) NULL'
	}
});

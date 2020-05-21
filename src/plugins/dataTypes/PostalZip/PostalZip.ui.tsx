import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dropdown, { DropdownOption } from '../../../components/dropdown/Dropdown';
import RadioPill, { RadioPillRow } from '../../../components/radioPills/RadioPill';
import { DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import { countryList, DataTypeFolder } from '../../../_plugins';
import { DialogActions, DialogContent, DialogTitle, SmallDialog } from '../../../components/dialogs';
import styles from './PostalZip.scss';

export type PostalZipSource = 'any' | 'countries' | 'countryRow' | 'regionRow';

export type PostalZipState = {
	source: PostalZipSource;
	selectedCountries: DataTypeFolder[];
	targetRowId: string;
};

export const initialState: PostalZipState = {
	source: 'any',
	selectedCountries: [],
	targetRowId: ''
};

const Dialog = ({ visible, data, id, onClose, countryI18n, coreI18n, i18n, onUpdate, countryRows, regionRows }: any): JSX.Element => {
	const countryPluginRows = countryRows.map(({ index, id, title }: any) => ({ value: id, label: `${i18n.row} #${index + 1}: ${title}` }));
	const countryPluginRowsExist = countryPluginRows.length > 0;
	const regionPluginRows = regionRows.map(({ index, id, title }: any) => ({ value: id, label: `${i18n.row} #${index + 1}: ${title}` }));
	const regionPluginRowsExist = regionPluginRows.length > 0;

	const onUpdateSource = (source: PostalZipSource): void => {
		const newValues = {
			...data,
			source
		};
		if (source === 'countryRow') {
			newValues.targetRowId = countryPluginRows[0].value;
		}
		if (source === 'regionRow') {
			newValues.targetRowId = regionPluginRows[0].value;
		}
		onUpdate(newValues);
	};

	const onChangeTargetRow = (row: DropdownOption) => {
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

	const getRegionRowDropdown = () => {
		if (data.source !== 'regionRow') {
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

	const getCountryPluginDropdown = () => {
		return null;
	};

	const getCountriesDropdown = () => {
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
		<SmallDialog onClose={onClose} open={visible}>
			<DialogTitle onClose={onClose}>{i18n.selectPostalCodes}</DialogTitle>
			<DialogContent dividers>
				<div>
					{i18n.explanation}
				</div>

				<h3>{i18n.source}</h3>

				<RadioPillRow>
					<RadioPill
						label={i18n.anyFormat}
						onClick={(): void => onUpdateSource('any')}
						name={`${id}-source`}
						checked={data.source === 'any'}
						tooltip={i18n.anyFormatDesc}
					/>
					<RadioPill
						label={i18n.countries}
						onClick={(): void => onUpdateSource('countries')}
						name={`${id}-source`}
						checked={data.source === 'countries'}
						tooltip={i18n.countriesDesc}
					/>
					<RadioPill
						label={i18n.countryRow}
						onClick={(): void => onUpdateSource('countryRow')}
						name={`${id}-source`}
						checked={data.source === 'countryRow'}
						disabled={!countryPluginRowsExist}
						tooltip={i18n.countryRowDesc}
					/>
					<RadioPill
						label={i18n.regionRow}
						onClick={(): void => onUpdateSource('regionRow')}
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
		</SmallDialog>
	);
};

export const Options = ({ id, data, coreI18n, i18n, countryI18n, onUpdate, countryRows, regionRows, cityRows }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);
	const numSelected = data.selectedCountries.length;

	let label = '';
	if (data.source === 'any') {
		label = i18n.anyFormat;
	} else if (data.source === 'countries') {
		label = `Any postal/zip from <b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.country : i18n.countries);
	} else if (data.source === 'countryRow') {
		const row = countryRows.find((row: any) => row.id === data.targetRowId);
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
			<Dialog
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

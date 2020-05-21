import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import { DataTypeFolder } from '../../../_plugins';
import Dropdown, { DropdownOption } from '../../../components/dropdown/Dropdown';
import { DialogActions, DialogContent, DialogTitle, SmallDialog } from '../../../components/dialogs';
import { countryList } from '../../../_plugins';
import styles from './Region.scss';
import { CountryState } from '../Country/Country.ui';
import RadioPill from '../../../components/RadioPill';

export type RegionSource = 'any' | 'countries' | 'row';

export type RegionState = {
	source: RegionSource;
	selectedCountries: DataTypeFolder[];
	targetRowId: string;
};

export const initialState: RegionState = {
	source: 'any',
	selectedCountries: [],
	targetRowId: ''
};

const Dialog = ({ visible, data, id, onClose, countryI18n, coreI18n, i18n, onUpdate, countryRows }: any): JSX.Element => {
	const countryPluginRows = countryRows
		.filter(({ data: countryRowData }: { data: CountryState }) => countryRowData.source === 'plugins')
		.map(({ index, id, title }: any) => ({ value: id, label: `${i18n.row} #${index + 1}: ${title}` }));

	const countryPluginRowsExist = countryPluginRows.length > 0;

	const onUpdateSource = (source: RegionSource): void => {
		const newValues = {
			...data,
			source
		};

		// always autoselect the first Country row when switching to `Country Row` as the source
		if (source === 'row') {
			newValues.targetRowId = countryPluginRows[0].value;
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

	const getCountryRow = () => {
		if (data.source !== 'row') {
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

	const getCountryPluginsList = () => {
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
				options={countryPluginOptions}
			/>
		);
	};

	return (
		<SmallDialog onClose={onClose} open={visible}>
			<DialogTitle onClose={onClose}>{i18n.selectRegions}</DialogTitle>
			<DialogContent dividers>
				<div>
					{i18n.explanation}
				</div>

				<h3>{i18n.source}</h3>

				<div className={styles.sourceBlock}>
					<RadioPill
						label={i18n.anyRegion}
						onClick={(): void => onUpdateSource('any')}
						name={`${id}-source`}
						checked={data.source === 'any'}
						tooltip={i18n.anyDesc}
						style={{ marginRight: 10 }}
					/>
					<RadioPill
						label={i18n.countries}
						onClick={(): void => onUpdateSource('countries')}
						name={`${id}-source`}
						checked={data.source === 'countries'}
						tooltip={i18n.countriesDesc}
						style={{ marginRight: 10 }}
					/>
					<RadioPill
						label={i18n.countryRow}
						onClick={(): void => onUpdateSource('row')}
						name={`${id}-source`}
						checked={data.source === 'row'}
						tooltip={i18n.rowDesc}
						disabled={!countryPluginRowsExist}
					/>
				</div>

				{getCountryRow()}
				{getCountryPluginsList()}

				<h3>{i18n.format}</h3>

				<p>
					<input
						type="checkbox"
						value="full"
					/>
					<label htmlFor={`${id}-`}>Full</label>
					<input
						type="checkbox"
						value="full"
					/>
					<label htmlFor={`${id}-`}>Short</label>
				</p>

			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
			</DialogActions>
		</SmallDialog>
	);
};

export const Options = ({ id, data, coreI18n, i18n, countryI18n, onUpdate, countryRows }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);
	const numSelected = data.selectedCountries.length;

	let label = '';
	if (data.source === 'any') {
		label = i18n.anyRegion;
	} else if (data.source === 'countries') {
		label = `Any region from <b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.country : i18n.countries);
	} else if (data.source === 'row') {
		const row = countryRows.find((row: any) => row.id === data.targetRowId);
		const rowNum = row.index + 1;
		label = `${i18n.countryRow} #${rowNum}`;
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

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<p>{i18n.DESC} <span dangerouslySetInnerHTML={{ __html: i18n.help_text }} /></p>
);

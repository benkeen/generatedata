import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Tooltip } from '../../../components/tooltips';
import { DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import { DataTypeFolder } from '../../../_plugins';
import Dropdown, { DropdownOption } from '../../../components/dropdown/Dropdown';
import { DialogActions, DialogContent, DialogTitle, SmallDialog } from '../../../components/dialogs';
import { countryList } from '../../../_plugins';
import styles from './City.scss';

export type RegionSource = 'any' | 'countries' | 'row';

export type CityState = {
	source: RegionSource;
	selectedCountries: DataTypeFolder[];
	targetRowId: string;
};

export const initialState: CityState = {
	source: 'any',
	selectedCountries: [],
	targetRowId: ''
};

const Dialog = ({ visible, data, id, onClose, countryI18n, coreI18n, i18n, onUpdate }: any): JSX.Element => {
	const countryPluginRows: any = [];
		// .filter(({ data: countryRowData }: { data }: any) => countryRowData.source === 'plugins')
		// .map(({ index, id, title }: any) => ({ value: id, label: `${i18n.row} #${index + 1}: ${title}` }));

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
			selectedCountries: [] // countries ? countries.map(({ value }: DropdownOption) => value) : []
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
			<DialogTitle onClose={onClose}>{i18n.selectCities}</DialogTitle>
			<DialogContent dividers>
				<div>
					{i18n.explanation}
				</div>

				<h3>{i18n.source}</h3>

				<div className={styles.sourceBlock}>
					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.autoDesc }} />} arrow>
						<Button onClick={(): void => onUpdateSource('any')} size="small" color="primary" variant="outlined" style={{ marginRight: 10 }}>
							<input
								type="radio"
								name={`${id}-source`}
								checked={data.source === 'any'}
								onChange={(): void => {}}
							/>
							<span>{i18n.anyCity}</span>
						</Button>
					</Tooltip>

					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: '' }} />} arrow>
						<Button onClick={(): void => onUpdateSource('countries')} size="small" color="primary" variant="outlined" style={{ marginRight: 10 }}>
							<input
								type="radio"
								name={`${id}-source`}
								checked={data.source === 'countries'}
								onChange={(): void => {}}
							/>
							<span>{i18n.countries}</span>
						</Button>
					</Tooltip>

					<Tooltip
						arrow
						title={<span dangerouslySetInnerHTML={{ __html: i18n.rowDesc }} />}
						disableHoverListener={!countryPluginRowsExist}
						disableFocusListener={!countryPluginRowsExist}>
						<span>
							<Button onClick={(): void => onUpdateSource('row')} size="small" color="primary" variant="outlined"
									disabled={!countryPluginRowsExist}>
								<input
									type="radio"
									name={`${id}-source`}
									checked={data.source === 'row'}
									onChange={(): void => {}}
								/>
								<span>{i18n.regionRow}</span>
							</Button>
						</span>
					</Tooltip>
				</div>

				{getCountryRow()}
				{getCountryPluginsList()}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
			</DialogActions>
		</SmallDialog>
	);
};

export const Options = ({ id, data, coreI18n, i18n, countryI18n, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);
	const numSelected = data.selectedCountries.length;

	let label = '';
	if (data.source === 'any') {
		label = i18n.anyCity;
	} else if (data.source === 'countries') {
		label = `Any city from <b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.country : i18n.countries);
	} else if (data.source === 'row') {
		// const row = countryRows.find((row: any) => row.id === data.targetRowId);
		// const rowNum = row.index + 1;
		// label = `${i18n.countryRow} #${rowNum}`;
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


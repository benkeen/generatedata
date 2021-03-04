import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
// import { DropdownOption } from '~components/dropdown/Dropdown';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import { CountrySource } from '../Country/Country';
import styles from './Track1.scss';

export type Track1Source = 'row' | 'random';

export type Track1State = {
	panSource: Track1Source;
	nameSource: Track1Source;
}

export const initialState: Track1State = {
	panSource: 'random',
	nameSource: 'random'
};

const Track1Dialog = ({ visible, data, id, onClose, onUpdateSource, coreI18n, i18n }: any): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>Track1 Data Source</DialogTitle>
				<DialogContent dividers>
					<div>
						This lets you target other fields to create more realistic Track1 values. By default
						it generates arbitrary strings for the PAN and name parts, so supplying actual rows
						generating that data ensures a valid and consistent Track1 value.
					</div>

					<h3>PAN source</h3>

					<RadioPillRow>
						<RadioPill
							label="Pan row"
							onClick={(): void => onUpdateSource('random')}
							name={`${id}-source`}
							checked={data.panSource === 'random'}
							tooltip={i18n.countryPluginsDesc}
						/>
						<RadioPill
							label="Random string"
							onClick={(): void => onUpdateSource('row')}
							name={`${id}-source`}
							checked={data.panSource === 'all'}
						/>
					</RadioPillRow>

					<h3>Name source</h3>
					<RadioPillRow>
						<RadioPill
							label="Name row"
							onClick={(): void => onUpdateSource('random')}
							name={`${id}-source`}
							checked={data.nameSource === 'random'}
							tooltip={i18n.countryPluginsDesc}
						/>
						<RadioPill
							label="Random string"
							onClick={(): void => onUpdateSource('row')}
							name={`${id}-source`}
							checked={data.nameSource === 'all'}
						/>
					</RadioPillRow>

				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ i18n, coreI18n, countryI18n, id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const onUpdateSource = (source: CountrySource): void => {
		onUpdate({
			source,
			selectedCountries: []
		});
	};

	const onUpdateSelectedCountries = (selectedCountries: string[]): void => {
		onUpdate({
			...data,
			selectedCountries
		});
	};

	// let label = '';
	// if (data.source === 'all') {
	// 	if (data.selectedCountries.length) {
	// 		label = `<b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.country : i18n.countries);
	// 	} else {
	// 		label = i18n.allCountries;
	// 	}
	// } else {
	// 	if (data.selectedCountries.length) {
	// 		label = `<b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.countryPlugin : i18n.countryPlugins);
	// 	} else {
	// 		label = i18n.allCountryPlugins;
	// 	}
	// }

	const label = 'Source info';

	return (
		<div className={styles.buttonLabel}>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				<span dangerouslySetInnerHTML={{ __html: label }} />
			</Button>
			<Track1Dialog
				visible={dialogVisible}
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				countryI18n={countryI18n}
				onUpdateSource={onUpdateSource}
				onUpdateSelectedCountries={onUpdateSelectedCountries}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.DESC}</p>;

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});


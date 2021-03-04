import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTHelpProps, DTOptionsProps } from '~types/dataTypes';
import { countryList } from '../../../../_plugins';
// import { DropdownOption } from '~components/dropdown/Dropdown';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import { CountrySource } from '../Country/Country';

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
						The fields below let you target other fields to create more realistic Track1 values. By default
						it generates arbitrary names and
					</div>

					<h3>{i18n.source}</h3>

					<RadioPillRow>
						<RadioPill
							label={`${i18n.countryPlugins} (${countryList.length})`}
							onClick={(): void => onUpdateSource('plugins')}
							name={`${id}-source`}
							checked={data.source === 'plugins'}
							tooltip={i18n.countryPluginsDesc}
						/>
						<RadioPill
							label={`${i18n.allCountries}`}
							onClick={(): void => onUpdateSource('all')}
							name={`${id}-source`}
							checked={data.source === 'all'}
						/>
					</RadioPillRow>

					<h3>{i18n.filter}</h3>
					<p>
						{i18n.filterDesc}
					</p>
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
	const numSelected = data.selectedCountries.length;

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

	let label = '';
	if (data.source === 'all') {
		if (data.selectedCountries.length) {
			label = `<b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.country : i18n.countries);
		} else {
			label = i18n.allCountries;
		}
	} else {
		if (data.selectedCountries.length) {
			label = `<b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.countryPlugin : i18n.countryPlugins);
		} else {
			label = i18n.allCountryPlugins;
		}
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

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.track1_help_intro}</p>;

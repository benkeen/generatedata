import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
// import { DropdownOption } from '~components/dropdown/Dropdown';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import styles from './Track1.scss';

export type Track1Source = 'row' | 'random';

export type Track1State = {
	panSource: Track1Source;
	targetPanRowId: string;
	nameSource: Track1Source;
	targetNameRowId: string;
}

export const initialState: Track1State = {
	panSource: 'random',
	targetPanRowId: '',
	nameSource: 'random',
	targetNameRowId: ''
};

const Track1Dialog = ({
	visible, data, id, panRows, nameRows, onClose, onUpdatePANSource, onUpdateNameSource, onUpdateRowSource, coreI18n,
	i18n
}: any): JSX.Element => {

	const getPanSourceDropdown = (): JSX.Element | null => {
		if (data.panSource !== "row") {
			return null;
		}

		const panRowOptions = panRows.map(({ pan, title, index }: any) => ({
			value: index + 1,
			label: `Row #${index+1}: ${title}`
		}));

		return (
			<Dropdown
				value={data.targetPanRowId}
				onChange={({ value }: DropdownOption) => onUpdateRowSource('targetPanRowId', value)}
				options={panRowOptions}
			/>
		);
	};

	const getNameSourceDropdown = (): JSX.Element | null => {

		console.log(nameRows);

		if (data.nameSource !== "row") {
			return null;
		}

		const nameRowOptions = nameRows.map(({ pan, title, index }: any) => ({
			value: index + 1,
			label: `Row #${index+1}: ${title}`
		}));

		return (
			<Dropdown
				value={data.targetNameRowId}
				onChange={({ value }: DropdownOption) => onUpdateRowSource('targetNameRowId', value)}
				options={nameRowOptions}
			/>
		);
	};

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
							label="Random string"
							onClick={(): void => onUpdatePANSource('random')}
							name={`${id}-panSource`}
							checked={data.panSource === 'random'}
						/>
						<RadioPill
							label="PAN row"
							onClick={(): void => onUpdatePANSource('row')}
							name={`${id}-panSource`}
							checked={data.panSource === 'row'}
							tooltip={i18n.countryPluginsDesc}
							disabled={panRows.length === 0}
						/>
					</RadioPillRow>

					{getPanSourceDropdown()}

					<h3>Name source</h3>
					<RadioPillRow>
						<RadioPill
							label="Random string"
							onClick={(): void => onUpdateNameSource('random')}
							name={`${id}-nameSource`}
							checked={data.nameSource === 'random'}
						/>
						<RadioPill
							label="Name row"
							onClick={(): void => onUpdateNameSource('row')}
							name={`${id}-nameSource`}
							checked={data.nameSource === 'row'}
							tooltip={i18n.countryPluginsDesc}
							disabled={nameRows.length === 0}
						/>
					</RadioPillRow>

					{getNameSourceDropdown()}

				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ i18n, coreI18n, countryI18n, panRows, nameRows, id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const onUpdateSource = (prop: string, value: any): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	const label = 'Track1 Source';

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
				panRows={panRows}
				nameRows={nameRows}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				countryI18n={countryI18n}
				onUpdateRowSource={(section: any, value: any) => onUpdateSource(section, value)}
				onUpdatePANSource={(value: any) => onUpdateSource('panSource', value)}
				onUpdateNameSource={(value: any) => onUpdateSource('nameSource', value)}
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


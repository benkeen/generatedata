import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import styles from './Track1.scss';

const Track1Dialog = ({
	visible, data, id, panRows, nameRows, onClose, onUpdatePANSource, onUpdateNameSource, onUpdateRowSource, coreI18n,
	i18n
}: any): JSX.Element => {

	const getPanSourceDropdown = (): JSX.Element | null => {
		if (data.panSource !== 'row') {
			return null;
		}

		const panRowOptions = panRows.map(({ id, title, index }: any) => ({
			value: id,
			label: `${i18n.row} #${index+1}: ${title}`
		}));

		return (
			<Dropdown
				value={data.targetPanRowId}
				onChange={({ value }: DropdownOption): void => onUpdateRowSource('targetPanRowId', value)}
				options={panRowOptions}
			/>
		);
	};

	const getNameSourceDropdown = (): JSX.Element | null => {
		if (data.nameSource !== 'row') {
			return null;
		}

		const nameRowOptions = nameRows.map(({ title, id, index }: any) => ({
			value: id,
			label: `${i18n.row} #${index+1}: ${title}`
		}));

		return (
			<Dropdown
				value={data.targetNameRowId}
				onChange={({ value }: DropdownOption): void => onUpdateRowSource('targetNameRowId', value)}
				options={nameRowOptions}
			/>
		);
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ maxWidth: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.dialogTitle}</DialogTitle>
				<DialogContent dividers>
					<div>
						{i18n.dialogDesc}
					</div>

					<h3>{i18n.panSource}</h3>

					<RadioPillRow>
						<RadioPill
							label={i18n.randomString}
							onClick={(): void => onUpdatePANSource('random')}
							name={`${id}-panSource`}
							checked={data.panSource === 'random'}
						/>
						<RadioPill
							label={i18n.panRow}
							onClick={(): void => onUpdatePANSource('row')}
							name={`${id}-panSource`}
							checked={data.panSource === 'row'}
							tooltip={i18n.countryPluginsDesc}
							disabled={panRows.length === 0}
						/>
					</RadioPillRow>

					{getPanSourceDropdown()}

					<h3>{i18n.nameSource}</h3>

					<RadioPillRow>
						<RadioPill
							label={i18n.randomString}
							onClick={(): void => onUpdateNameSource('random')}
							name={`${id}-nameSource`}
							checked={data.nameSource === 'random'}
						/>
						<RadioPill
							label={i18n.nameRow}
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

export const Options = ({
	i18n, coreI18n, countryI18n, panRows, nameRows, id, data, onUpdate
}: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const onUpdateSource = (prop: string, value: any): void => {
		const newValues = {
			...data,
			[prop]: value
		};

		// always autoselect the first PAN/Name row when switching to a row as the source
		if (prop === 'panSource') {
			newValues.targetPanRowId = (value === 'row') ? panRows[0].id : '';
		} else if (prop === 'nameSource') {
			newValues.targetNameRowId = (value === 'row') ? nameRows[0].id : '';		}

		onUpdate(newValues);
	};

	let label = i18n.customizeSource;
	if (data.targetPanRowId !== '' && data.targetNameRowId !== '') {
		const { index: panIndex } = panRows.find((row: any) => row.id === data.targetPanRowId);
		const { index: nameIndex } = nameRows.find((row: any) => row.id === data.targetNameRowId);
		label = `${i18n.panRow}: #${panIndex+1}, ${i18n.nameRow}: #${nameIndex+1}`;
	} else if (data.targetPanRowId !== '') {
		const { index } = panRows.find((row: any) => row.id === data.targetPanRowId);
		label = `${i18n.panRow}: #${index+1}`;
	} else if (data.targetNameRowId !== '') {
		const row = nameRows.find((row: any) => row.id === data.targetNameRowId);
		label = `${i18n.nameRow}: #${row.index+1}`;
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
				panRows={panRows}
				nameRows={nameRows}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				countryI18n={countryI18n}
				onUpdateRowSource={(section: any, value: any): void => onUpdateSource(section, value)}
				onUpdatePANSource={(value: any): void => onUpdateSource('panSource', value)}
				onUpdateNameSource={(value: any): void => onUpdateSource('nameSource', value)}
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
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});


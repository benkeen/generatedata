import React from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import { DTMetadata, DTOptionsProps } from '~types/dataTypes';
import * as styles from './Email.scss';
import { Tooltip } from '~components/tooltips';

export const enum StringSource {
	random = 'random',
	fields = 'fields'
}

export type EmailState = {
	source: StringSource;
	fieldId1: string;
	fieldId2: string;
	domains: string;
	domainSuffixes: string;
}

const unsupportedDataTypes = ['Computed'];

const EmailDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, sortedRows, i18n }: any): JSX.Element => {
	const rowOptions = sortedRows
		.map(({ id: currentId, title, dataType }: any, index: number) => ({
			value: currentId,
			label: `${i18n.row} #${index + 1}: ${title}`,
			extra: { currentId, dataType }
		}))
		.filter(({ extra }: any) => {
			return extra.currentId !== id && unsupportedDataTypes.indexOf(extra.dataType) === -1;
		});

	const getFieldsRow = (): JSX.Element | null => {
		if (data.source === StringSource.random) {
			return null;
		}

		return (
			<div className={styles.fieldsRow}>
				<div className={styles.fieldRow} style={{ marginRight: 10 }}>
					<label>{i18n.sourceDataField1}</label>
					<Dropdown
						value={data.fieldId1}
						onChange={(item: any): any => onUpdate('fieldId1', item.value)}
						options={[
							{ value: '', label: coreI18n.pleaseSelect },
							...rowOptions
						]}
					/>
				</div>
				<div className={styles.fieldRow}>
					<label>{i18n.sourceDataField2}</label>
					<Dropdown
						value={data.fieldId2}
						onChange={(item: any): any => onUpdate('fieldId2', item.value)}
						options={[
							{ value: '', label: i18n.optional },
							...rowOptions
						]}
					/>
				</div>
			</div>
		);
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.selectSource}</DialogTitle>
				<DialogContent dividers>
					<div>
						{i18n.emailDesc}
					</div>

					<h3>{i18n.source}</h3>

					<RadioPillRow>
						<RadioPill
							label={i18n.randomStringsLabel}
							onClick={(): void => onUpdate('source', StringSource.random)}
							name={`${id}-source`}
							checked={data.source === StringSource.random}
							tooltip={i18n.countryPluginsDesc}
							style={{ marginRight: 10 }}
						/>
						<RadioPill
							label={i18n.fieldsLabel}
							onClick={(): void => onUpdate('source', StringSource.fields)}
							name={`${id}-source`}
							checked={data.source === StringSource.fields}
						/>
					</RadioPillRow>
					{getFieldsRow()}
					<div className={styles.fieldRow}>
						<label>{i18n.domains}</label>
						<TextField
							value={data.domains}
							onChange={(e: any): void => onUpdate('domains', e.target.value)}
						/>
					</div>
					<div className={styles.fieldRow}>
						<label>
							{i18n.domainSuffixes}
							<Tooltip title="......" arrow>
								<InfoIcon />
							</Tooltip>
						</label>
						<TextField
							value={data.domainSuffixes}
							onChange={(e: any): void => onUpdate('domainSuffixes', e.target.value)}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const initialState: EmailState = {
	source: StringSource.random,
	fieldId1: '',
	fieldId2: '',
	domains: 'google,hotmail,aol,icloud,outlook,yahoo,protonmail',
	domainSuffixes:  'edu,com,org,ca,net,co.uk'
};

export const Options = ({ i18n, coreI18n, id, data, onUpdate, sortedRows }: DTOptionsProps): JSX.Element => {

	// workaround for earlier version of the DT where there was no state.
	const safeData = data ? data : {
		source: StringSource.random,
		fieldId1: '',
		fieldId2: ''
	};

	const [dialogVisible, setDialogVisibility] = React.useState(false);

	let label = `${i18n.source} ${i18n.random}`;
	if (data.source === StringSource.fields) {
		label = `${i18n.source} ${i18n.fields}`;
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
			<EmailDialog
				visible={dialogVisible}
				data={safeData}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				onUpdate={(field: string, value: any): void => onUpdate({ ...safeData, [field]: value })}
				sortedRows={sortedRows}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</div>
	);
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

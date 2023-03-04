import React from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import * as styles from './Email.scss';
import { StringSourceEnum, EmailState, defaultDomainSuffixes, defaultDomains, GenerationOptionsType } from './Email.state';
import { Tooltip } from '~components/tooltips';


const EmailDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, rowOptions, i18n }: any): JSX.Element => {
	const getFieldsRow = (): JSX.Element | null => {
		if (data.source === StringSourceEnum.random) {
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
							onClick={(): void => onUpdate('source', StringSourceEnum.random)}
							name={`${id}-source`}
							checked={data.source === StringSourceEnum.random}
							tooltip={i18n.countryPluginsDesc}
							style={{ marginRight: 10 }}
						/>
						<RadioPill
							label={i18n.fieldsLabel}
							onClick={(): void => onUpdate('source', StringSourceEnum.fields)}
							name={`${id}-source`}
							checked={data.source === StringSourceEnum.fields}
							disabled={rowOptions.length === 0}
							tooltip={rowOptions.length === 0 ? 'disabled.' : ''}
						/>
					</RadioPillRow>
					{getFieldsRow()}
					<div className={styles.fieldRow}>
						<label>
							{i18n.domains}
							<Tooltip title={i18n.domainsDesc} arrow>
								<InfoIcon />
							</Tooltip>
						</label>
						<TextField
							value={data.domains}
							onChange={(e: any): void => onUpdate('domains', e.target.value)}
							error={data.domains ? '' : coreI18n.requiredField}
						/>
					</div>
					<div className={styles.fieldRow}>
						<label>
							{i18n.domainSuffixes}
							<Tooltip title={i18n.domainSuffixDesc} arrow>
								<InfoIcon />
							</Tooltip>
						</label>
						<TextField
							value={data.domainSuffixes}
							onChange={(e: any): void => onUpdate('domainSuffixes', e.target.value)}
							error={data.domainSuffixes ? '' : coreI18n.requiredField}
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

// earlier version of this DT didn't have any state whatsoever
const getSafeState = (data: EmailState | undefined): EmailState => {
	return data ? data : {
		source: StringSourceEnum.random,
		fieldId1: '',
		fieldId2: '',
		domains: defaultDomains,
		domainSuffixes: defaultDomainSuffixes
	};
};

export const Options = ({ i18n, coreI18n, id, data, onUpdate, nameRows }: DTOptionsProps): JSX.Element => {
	const safeData = getSafeState(data);
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	let label = `${i18n.source} ${i18n.random}`;
	if (safeData.source === StringSourceEnum.fields) {
		label = `${i18n.source} ${i18n.fieldsLabel}`;
	}

	const rowOptions = nameRows
		.map(({ id: currentId, title, index }: any) => ({
			value: currentId,
			label: `${i18n.row} #${index + 1}: ${title}`
		}));

	React.useEffect(() => {
		if (!nameRows.length && safeData.source === StringSourceEnum.fields) {
			onUpdate({
				...safeData,
				source: StringSourceEnum.random
			});
		}
	}, [nameRows]);

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
				rowOptions={rowOptions}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.emailHelp1}
		</p>

		<h3>{i18n.sourceTitle}</h3>
		<p>
			{i18n.emailHelp2}
		</p>

		<h3>{i18n.domains}</h3>
		<p>
			{i18n.emailHelp3}
		</p>

		<h3>{i18n.domainSuffixes}</h3>
		<p>
			{i18n.emailHelp4}
		</p>
	</>
);

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

export const rowStateReducer = (state: EmailState): GenerationOptionsType => {
	const safeData = getSafeState(state);
	return {
		...safeData,
		domains: safeData.domains.split(',').filter((i) => !!i).map((i) => i.replace(/[^0-9a-zA-Z]/g, '')),
		domainSuffixes: safeData.domainSuffixes.split(',').filter((i) => !!i).map((i) => i.replace(/[^0-9a-zA-Z]/g, ''))
	};
};

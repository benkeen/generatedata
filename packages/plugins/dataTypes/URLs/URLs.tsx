import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTExampleProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import Dropdown from '~components/dropdown/Dropdown';
import CheckboxPill from '~components/pills/CheckboxPill';
import { URLsState, GenerationOptionsType, initialState } from './URLs.state';
import styles from './URLs.scss';

export const Example = ({ data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		const parts = value.split(',');

		onUpdate({
			...data,
			example: value,
			protocolEnabled: parts.indexOf('protocol') !== -1,
			hostnameEnabled: parts.indexOf('hostname') !== -1,
			pathEnabled: parts.indexOf('path') !== -1,
			queryParamsEnabled: parts.indexOf('queryparams') !== -1,
		});
	};

	const options = [
		{ value: 'protocol,hostname', label: 'protocol://hostname' },
		{ value: 'protocol', label: 'protocol://' },
		{ value: 'hostname', label: 'hostname' },
		{ value: 'protocol,hostname,path', label: 'protocol://hostname/path' },
		{ value: 'protocol,hostname,path,queryparams', label: 'protocol://hostname/path?queryparams' },
		{ value: 'protocol,hostname,queryparams', label: 'protocol://hostname/?queryparams' },
		{ value: 'queryparams', label: '?queryparams' },
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

const URLsDialog = ({
	visible, data, id, onClose, onUpdate, coreI18n, i18n
}: any): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.NAME}</DialogTitle>
				<DialogContent dividers>
					<div>
						{i18n.optionsDesc}
					</div>

					<h3>{coreI18n.options}</h3>

					<blockquote className={styles.optionsView}>
						<pre>
							<span className={data.protocolEnabled ? styles.enabledSection : styles.disabledSection}>protocol://</span>
							<span className={data.hostnameEnabled ? styles.enabledSection : styles.disabledSection}>hostname</span>
							<span className={data.pathEnabled ? styles.enabledSection : styles.disabledSection}>/path</span>
							<span className={data.queryParamsEnabled ? styles.enabledSection : styles.disabledSection}>?queryparams</span>
						</pre>
					</blockquote>

					<div>
						<div className={styles.settingsRow}>
							<div className={styles.firstCol}>
								<CheckboxPill
									label={i18n.protocol}
									onClick={(): void => onUpdate({ ...data, protocolEnabled: !data.protocolEnabled })}
									name={`protocol-${id}`}
									checked={data.protocolEnabled}
								/>
							</div>
							<div className={styles.secondCol}>
								<input
									type="text"
									value={data.protocolOptions}
									onChange={(e): void => onUpdate({ ...data, protocolOptions: e.target.value })}
									disabled={!data.protocolEnabled}
								/>
							</div>
						</div>
						<div className={styles.settingsRow}>
							<div className={styles.firstCol}>
								<CheckboxPill
									label={i18n.hostname}
									onClick={(): void => onUpdate({ ...data, hostnameEnabled: !data.hostnameEnabled })}
									name={`hostname-${id}`}
									checked={data.hostnameEnabled}
								/>
							</div>
							<div className={styles.secondCol}>
								<input
									type="text"
									value={data.hostnameOptions}
									onChange={(e): void => onUpdate({ ...data, hostnameOptions: e.target.value })}
									disabled={!data.hostnameEnabled}
								/>
							</div>
						</div>
						<div className={styles.settingsRow}>
							<div className={styles.firstCol}>
								<CheckboxPill
									label={i18n.path}
									onClick={(): void => onUpdate({ ...data, pathEnabled: !data.pathEnabled })}
									name={`path-${id}`}
									checked={data.pathEnabled}
								/>
							</div>
							<div className={styles.secondCol}>
								<input
									type="text"
									value={data.pathOptions}
									onChange={(e): void => onUpdate({ ...data, pathOptions: e.target.value })}
									disabled={!data.pathEnabled}
								/>
							</div>
						</div>
						<div className={styles.settingsRow}>
							<div className={styles.firstCol}>
								<CheckboxPill
									label={i18n.queryParams}
									onClick={(): void => onUpdate({ ...data, queryParamsEnabled: !data.queryParamsEnabled })}
									name={`queryParams-${id}`}
									checked={data.queryParamsEnabled}
								/>
							</div>
							<div className={styles.secondCol}>
								<input
									type="text"
									value={data.queryParamsOptions}
									onChange={(e): void => onUpdate({ ...data, queryParamsOptions: e.target.value })}
									disabled={!data.queryParamsEnabled}
								/>
							</div>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ i18n, id, coreI18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [visible, setDialogVisibility] = React.useState(false);

	return (
		<>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small"
				className={styles.buttonLabel}>
				{coreI18n.options}
			</Button>
			<URLsDialog
				visible={visible}
				id={id}
				data={data}
				onUpdate={onUpdate}
				coreI18n={coreI18n}
				onClose={(): void => setDialogVisibility(false)}
				i18n={i18n}
			/>
		</>
	);
};

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

export const cleanListWithBackup = (listStr: string, backup: string): string[] => {
	const list: string[] = [];
	listStr.split(',').forEach((item) => {
		const cleanItem = item.trim();
		if (cleanItem) {
			list.push(cleanItem);
		}
	});
	return list.length ? list : backup.split(',');
};

// clean up the UI data so the generator script doesn't have to worry about it on every call
export const rowStateReducer = (state: URLsState): GenerationOptionsType => ({
	protocolEnabled: state.protocolEnabled,
	protocolOptions: cleanListWithBackup(state.protocolOptions, initialState.protocolOptions),
	hostnameEnabled: state.hostnameEnabled,
	hostnameOptions: cleanListWithBackup(state.hostnameOptions, initialState.hostnameOptions),
	pathEnabled: state.pathEnabled,
	pathOptions: cleanListWithBackup(state.pathOptions, initialState.pathOptions),
	queryParamsEnabled: state.queryParamsEnabled,
	queryParamsOptions: cleanListWithBackup(state.queryParamsOptions, initialState.queryParamsOptions),
});

import React from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import TextField from '~components/TextField';
import CheckboxPill from '~components/pills/CheckboxPill';
import { DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { Tooltip } from '~components/tooltips';
import { BitcoinAddressFormat } from './BitcoinAddress.state';
import styles from './BitcoinAddress.scss';

const BitcoinDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, i18n }: any): JSX.Element => {
	const onToggleFormat = (format: BitcoinAddressFormat, checked: boolean): void => {
		onUpdate({
			...data,
			[format]: {
				...data[format ],
				enabled: checked
			}
		});
	};

	const onChangeWeight = (prop: BitcoinAddressFormat, weight: number): void => {
		onUpdate({
			...data,
			[prop]: {
				...data[prop],
				weight
			}
		});
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 400 }}>
				<DialogTitle onClose={onClose}>{i18n.bitcoinSettings}</DialogTitle>
				<DialogContent dividers>
					<table className={styles.table}>
						<thead>
							<tr>
								<td className={styles.labelCol}>{coreI18n.format}</td>
								<td>
									<div className={styles.formatHeader}>
										<span>{i18n.weight}</span>
										<Tooltip title={i18n.weightDesc} arrow>
											<InfoIcon />
										</Tooltip>
									</div>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className={styles.labelCol}>
									<CheckboxPill
										label="P2PKH / Legacy"
										onClick={(): void => (
											onToggleFormat(BitcoinAddressFormat.Legacy, !data[BitcoinAddressFormat.Legacy].enabled)
										)}
										name={`format-${id}`}
										checked={data[BitcoinAddressFormat.Legacy].enabled}
									/>
								</td>
								<td>
									<TextField
										type="number"
										min={0}
										step={1}
										value={data[BitcoinAddressFormat.Legacy].weight}
										style={{ width: 60 }}
										disabled={!data[BitcoinAddressFormat.Legacy].enabled}
										onChange={(e: any): void => onChangeWeight(BitcoinAddressFormat.Legacy, parseInt(e.target.value))}
									/>
								</td>
							</tr>
							<tr>
								<td className={styles.labelCol}>
									<CheckboxPill
										label="P2SH / Compatibility"
										onClick={(): void => onToggleFormat(BitcoinAddressFormat.Compatibility, !data[BitcoinAddressFormat.Compatibility].enabled)}
										name={`format-${id}`}
										checked={data[BitcoinAddressFormat.Compatibility].enabled}
									/>
								</td>
								<td>
									<TextField
										type="number"
										min={0}
										step={1}
										value={data[BitcoinAddressFormat.Compatibility].weight}
										style={{ width: 60 }}
										disabled={!data[BitcoinAddressFormat.Compatibility].enabled}
										onChange={(e: any): void => onChangeWeight(BitcoinAddressFormat.Compatibility, parseInt(e.target.value))}
									/>
								</td>
							</tr>
							<tr>
								<td className={styles.labelCol}>
									<CheckboxPill
										label="P2WPKH / Bech32"
										onClick={(): void => onToggleFormat(BitcoinAddressFormat.Segwit, !data[BitcoinAddressFormat.Segwit].enabled)}
										name={`format-${id}`}
										checked={data[BitcoinAddressFormat.Segwit].enabled}
									/>
								</td>
								<td>
									<TextField
										type="number"
										min={0}
										step={1}
										value={data[BitcoinAddressFormat.Segwit].weight}
										style={{ width: 60 }}
										disabled={!data[BitcoinAddressFormat.Segwit].enabled}
										onChange={(e: any): void => onChangeWeight(BitcoinAddressFormat.Segwit, parseInt(e.target.value))}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};


export const Options = ({ data, id, i18n, coreI18n, onUpdate }: DTOptionsProps): JSX.Element | null => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	let count = 0;
	if (data[BitcoinAddressFormat.Legacy].enabled) {
		count++;
	}
	if (data[BitcoinAddressFormat.Compatibility].enabled) {
		count++;
	}
	if (data[BitcoinAddressFormat.Segwit].enabled) {
		count++;
	}

	let buttonLabel = `1 ${i18n.format}`;
	if (count > 1) {
		buttonLabel = `${count} ${i18n.formats}`;
	}

	return (
		<div>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				<span dangerouslySetInnerHTML={{ __html: buttonLabel }}/>
			</Button>
			<BitcoinDialog
				visible={dialogVisible}
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				onClose={(): void => setDialogVisibility(false)}
				onUpdate={onUpdate}
			/>
		</div>
	);
};


export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string',
	},
	sql: {
		field: 'varchar(50)',
		field_Oracle: 'varchar2(50)',
		field_MSSQL: 'VARCHAR(50) NULL'
	}
});

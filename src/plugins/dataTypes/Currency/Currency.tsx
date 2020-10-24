import * as React from 'react';
import Button from '@material-ui/core/Button';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import styles from './Currency.scss';

export const initialState = {
	example: 'XXX.XX|0.00|100.00|$|prefix',
	format: 'XXX.XX',
	from: '0.00',
	to: '100.00',
	currencySymbol: '$',
	currencySymbolLocation: 'prefix'
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (i: any): void => {
		const [format, from, to, currencySymbol, currencySymbolLocation] = i.value.split('|');
		onUpdate({
			example: i.value,
			format,
			from,
			to,
			currencySymbol,
			currencySymbolLocation
		});
	};

	const examples = [
		{
			label: 'US/Canada',
			options: [
				{ value: 'XXX.XX|0.00|100.00|$|prefix', label: '$0.00 -> $100.00' },
				{ value: 'XX,XXX|5000|10000|$|prefix', label: `$5,000 -> $10,000 (${i18n.noCents})` },
				{ value: 'XXXXX.XX|1000.00|10000.00|$|prefix', label: `$1000.00 -> $10000.00 (${i18n.noThousandDelimiters})` },
				{ value: 'XXX,XXX.XX|-100000.00|100000.00|$|prefix', label: '-$100,000.00 -> $100,000.00' },
				{ value: 'X.XX|0.00|100.00||prefix', label: `0.01 -> 1.00 (${i18n.noDollarSign})` },
				{ value: 'X.XXX.XXX,XX|100.00|1000.00|$|suffix', label: '100,00 $ -> 1.000,00 $ (French Canadian)' },
				{ value: 'XXX XXX|10|100000||prefix', label: '10 -> 100 000' }
			]
		},
		{
			label: 'UK',
			options: [
				{ value: 'XXX.XX|0.00|100.00|£|prefix', label: '£0.00 -> £100.00' }
			]
		},
		{
			label: 'Euro',
			options: [
				{ value: 'XXX,XXX|100000|200000|€|prefix', label: '€100,000 -> €200,000' }
			]
		}
	];

	return (
		<Dropdown
			isGrouped={true}
			value={data.example}
			onChange={onChange}
			options={examples}
		/>
	);
};


const CurrencySettingsDialog = ({ visible, data, onClose, coreI18n, i18n }: any): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>Currency Settings</DialogTitle>
				<DialogContent dividers>
					<div>
						{i18n.explanation}
					</div>

					<div>
						Format: <input type="text" value={data.format} style={{ width: 160 }} />
					</div>

					<div>
						{i18n.currencySymbol}
						<input type="text" value={data.currencySymbol} style={{ width: 20 }} />
						<select defaultValue={data.currencySymbolLocation}>
							<option value="prefix">{i18n.prefix}</option>
							<option value="suffix">{i18n.suffix}</option>
						</select>
					</div>

				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ i18n, coreI18n, id, data }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const label = "Settings";

	return (
		<>
			<input type="text" value={data.from} style={{ width: 80 }} />
			<ArrowRightAlt />
			<input type="text" value={data.to} style={{ width: 80 }} />

			<div className={styles.buttonLabel}>
				<Button
					onClick={(): void => setDialogVisibility(true)}
					variant="outlined"
					color="primary"
					size="small">
					<span dangerouslySetInnerHTML={{ __html: label }} />
				</Button>
				<CurrencySettingsDialog
					visible={dialogVisible}
					data={data}
					id={id}
					i18n={i18n}
					coreI18n={coreI18n}
					onClose={(): void => setDialogVisibility(false)}
				/>
			</div>

		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.helpIntro}
		</p>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.format}</label>
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.formatDesc }} />
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.rangeFrom}</label>
			</div>
			<div className={styles.col2}>{i18n.rangeFromDesc}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.rangeTo}</label>
			</div>
			<div className={styles.col2}>{i18n.rangeToDesc}</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.currencySymbol}</label>
			</div>
			<div className={styles.col2} dangerouslySetInnerHTML={{ __html: i18n.currencySymbolDesc }}/>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>{i18n.prefixSuffix}</label>
			</div>
			<div className={styles.col2}>{i18n.prefixSuffixDesc}</div>
		</div>
	</>
);


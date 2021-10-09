import React from 'react';
import Button from '@material-ui/core/Button';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import Dropdown from '~components/dropdown/Dropdown';
import { DTMetadata, DTOptionsProps } from '~types/dataTypes';
import * as styles from './Email.scss';

export const enum StringSource {
	random = 'random',
	fields = 'fields'
}

export type EmailState = {
	source: StringSource;
	fieldId1: string;
	fieldId2: string;
}

const EmailDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, sortedRows, i18n }: any): JSX.Element => {
	const rowOptions = sortedRows
		.filter(({ id: currentId }: any) => currentId !== id)
		.map(({ id: currentId, title }: any, index: number) => ({ value: currentId, label: `${i18n.row} #${index + 1}: ${title}` }));

	const getFieldsBlock = (): JSX.Element | null => {
		if (data.source === StringSource.random) {
			return null;
		}

		return (
			<>
				<div className={styles.fieldRow}>
					<label>Source data, field 1</label>
					<Dropdown
						value={data.fieldId1}
						onChange={(item: any): any => onUpdate('fieldId1', item.value)}
						options={rowOptions}
					/>
				</div>
				<div className={styles.fieldRow}>
					<label>Source data, field 2 (optional)</label>
					<Dropdown
						value={data.fieldId2}
						onChange={(item: any): any => onUpdate('fieldId2', item.value)}
						options={rowOptions}
					/>
				</div>
			</>
		);
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>Select source</DialogTitle>
				<DialogContent dividers>
					<div>
						By default this Data Type generates random email addresses using lorem ipsum text,
						but if you'd like to generate more realistic-looking email addresses, target one or
						more fields (Name fields are best!) in your data set to use those strings as the basis of the
						email address.
					</div>

					<h3>{i18n.source}</h3>

					<RadioPillRow>
						<RadioPill
							label="Random strings"
							onClick={(): void => onUpdate('source', StringSource.random)}
							name={`${id}-source`}
							checked={data.source === StringSource.random}
							tooltip={i18n.countryPluginsDesc}
							style={{ marginRight: 10 }}
						/>
						<RadioPill
							label="Fields"
							onClick={(): void => onUpdate('source', StringSource.fields)}
							name={`${id}-source`}
							checked={data.source === StringSource.fields }
						/>
					</RadioPillRow>

					{getFieldsBlock()}
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
	fieldId2: ''
};

export const Options = ({ i18n, coreI18n, id, data, onUpdate, sortedRows }: DTOptionsProps): JSX.Element => {

	// awkward workaround for earlier version of the component where there was no state.
	const safeData = data ? data : {
		source: StringSource.random,
		fieldId1: '',
		fieldId2: ''
	};

	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const label = 'Customize';

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

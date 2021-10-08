import React from 'react';
import Button from '@material-ui/core/Button';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { DTMetadata, DTOptionsProps } from '~types/dataTypes';
import * as styles from "./Email.scss";

export const enum StringSource {
	random = 'random',
	fields = 'fields'
}

export type EmailState = {
	source: StringSource;
	fieldId1: string;
	fieldId2: string;
}

export const initialState: EmailState = {
	source: StringSource.random,
	fieldId1: '',
	fieldId2: ''
};

const EmailDialog = ({ visible, data, id, onClose, coreI18n, onUpdateSource, i18n }: any): JSX.Element => {
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
							onClick={(): void => onUpdateSource('plugins')}
							name={`${id}-source`}
							checked={data.source === StringSource.random}
							tooltip={i18n.countryPluginsDesc}
							style={{ marginRight: 10 }}
						/>
						<RadioPill
							label="Fields"
							onClick={(): void => onUpdateSource('all')}
							name={`${id}-source`}
							checked={data.source === StringSource.random}
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

export const Options = ({ i18n, coreI18n, id, data, onUpdate }: DTOptionsProps): JSX.Element => {

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
				onUpdateSource={(source: StringSource) => onUpdate({ ...safeData, source })}
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

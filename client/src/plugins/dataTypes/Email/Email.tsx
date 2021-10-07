import React from 'react';
import Button from '@material-ui/core/Button';
import { countryList } from '../../../../_plugins';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { RadioPillRow } from '~components/radioPills/RadioPill';
import { DTOptionsProps } from '~types/dataTypes';

export const enum StringSource {
	random = 'random',
	fields = 'fields'
}

export type EmailState = {
	source: StringSource;
	nameRow1Id: string;
	nameRow2Id: string;
}

export const initialState: EmailState = {
	source: StringSource.random,
	nameRow1Id: '',
	nameRow2Id: ''
};

const EmailDialog = ({ visible, data, id, onClose, coreI18n, i18n }: any): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>Select source</DialogTitle>
				<DialogContent dividers>
					<div>
						By default this Data Type generates random email addresses using lorem ipsum text,
						but you can choose to base the source data on other fields such as name fields below.
					</div>

					<h3>{i18n.source}</h3>

					<RadioPillRow>
						<RadioPill
							label="Random strings"
							onClick={(): void => onUpdateSource('plugins')}
							name={`${id}-source`}
							checked={data.source === Names}
							tooltip={i18n.countryPluginsDesc}
						/>
						<RadioPill
							label="Fields"
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

export const Options = ({ i18n, coreI18n, id, data }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	let label = '';
	if (data.source === 'random') {
	} else {
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
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
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

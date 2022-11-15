import React from 'react';
import { PrimaryButton } from '~components/Buttons.component';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './Schema.scss';

export type SchemaDialogProps = {
	visible: boolean;
	onClose: any;
	schema: string;
	i18n: any;
};

const SchemaDialog = ({ visible, onClose, schema, i18n }: SchemaDialogProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible} className={styles.schemaDialog}>
		<div style={{ width: 460 }}>
			<DialogTitle onClose={onClose}>Schema</DialogTitle>
			<DialogContent dividers>
				<blockquote>
					<pre>
						{schema}
					</pre>
				</blockquote>
			</DialogContent>
			<DialogActions className={styles.actions}>
				<PrimaryButton onClick={onClose} color="default">
					{i18n.close}
				</PrimaryButton>
			</DialogActions>
		</div>
	</Dialog>
);

export default SchemaDialog;

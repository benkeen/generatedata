import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { PrimaryButton } from '~components/Buttons.component';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import FeatureToggles from '../../featureToggles';
import styles from './Schema.scss';

export type SchemaDialogProps = {
	visible: boolean;
	onClose: any;
	schema: string;
	theme: string;
	i18n: any;
};

const SchemaDialog = ({
	visible, onClose, schema, theme, i18n
}: SchemaDialogProps): JSX.Element | null => {
	if (!FeatureToggles.DATA_TEMPLATE_GENERATION_UI) {
		return null;
	}

	const [code, setCode] = React.useState(schema);

	return (
		<Dialog onClose={onClose} open={visible} className={styles.schemaDialog}>
			<div style={{ width: 800 }}>
				<DialogTitle onClose={onClose}>Schema</DialogTitle>
				<DialogContent dividers className={`${styles.content} themeLucario`}>
					<CodeMirror
						value={code}
						onBeforeChange={(editor, data, value): void => setCode(value)}
						options={{
							mode: 'application/ld+json',
							theme,
							lineNumbers: false,
							lineWrapping: false,
							readOnly: true
						}}
					/>
				</DialogContent>
				<DialogActions className={styles.actions}>
					<PrimaryButton onClick={onClose} color="default">
						{i18n.close}
					</PrimaryButton>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default SchemaDialog;

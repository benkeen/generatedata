import React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { Github } from '~components/icons';
import styles from './About.scss';

export type AboutProps = {
	visible: boolean;
	onClose: any;
	scriptVersion: string;
	i18n: any;
};

const AboutDialog = ({ visible, onClose, scriptVersion, i18n }: AboutProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible} className={styles.aboutDialog}>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>{i18n.about}</DialogTitle>
			<DialogContent dividers>
				<div>
					{i18n.aboutInfo}
				</div>

				<p>
					<h4>generatedata.com &#8212; <span>v{scriptVersion}</span></h4>
				</p>
			</DialogContent>
			<DialogActions className={styles.actions}>
				<Button onClick={onClose} color="primary" variant="outlined">
					{i18n.close}
				</Button>
				<Button onClick={() => {
					window.open('https://github.com/benkeen/generatedata', '_blank');
				}} color="primary" variant="outlined">
					<Github />
					View on Github
				</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default AboutDialog;

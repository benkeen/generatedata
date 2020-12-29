import React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { Github } from '~components/icons';
import Link from '~components/Link.component';
import styles from './About.scss';
import { Tooltip } from '~components/tooltips';

export type AboutProps = {
	visible: boolean;
	onClose: any;
	scriptVersion: string;
	i18n: any;
};

const AboutDialog = ({ visible, onClose, scriptVersion, i18n }: AboutProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible} className={styles.aboutDialog}>
		<div style={{ width: 460 }}>
			<DialogTitle onClose={onClose}>{i18n.about}</DialogTitle>
			<DialogContent dividers>
				<div>
					<h4>generatedata.com &#8212;
						<Tooltip title="View changelog">
							<span>
								<Link url="https://github.com/benkeen/generatedata/blob/master/CHANGELOG.md" offSite={true}>v{scriptVersion}</Link>
							</span>
						</Tooltip>
					</h4>
				</div>
				<p>
					{i18n.aboutInfoPara1}
				</p>
				<p>
					{i18n.aboutInfoPara2}
				</p>
			</DialogContent>
			<DialogActions className={styles.actions}>
				<Button onClick={onClose} color="default" variant="outlined">
					{i18n.close}
				</Button>
				<Button onClick={(): void => {
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

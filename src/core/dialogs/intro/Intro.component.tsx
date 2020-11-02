import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import Link from '~components/Link';
import styles from './Intro.scss';

export type IntroProps = {
	visible: boolean;
	onClose: any;
	i18n: any;
};

const IntroDialog = ({ i18n, visible, onClose }: IntroProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ maxWidth: 500 }}>
			<DialogTitle onClose={onClose}>generatedata 4.0.0 alpha</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<div style={{ width: 90, height: 90, marginRight: 10 }}>
					<img src="./images/dice180x180.png" width={90} height={90} />
				</div>
				<div>
					<p>
						Welcome! This site contains the alpha 4.0.0 version of the
						upcoming <Link url="http://generatedata.com" offSite={true}>generatedata.com</Link> site. The
						script is functional, but at this stage it's still incomplete and buggy - <i>you have been warned</i>.
					</p>
					<p>
						<a href="mailto:ben.keen@gmail.com">Comments and feedback</a> about the new interface is always appreciated. :)
					</p>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">{i18n.close}</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default IntroDialog;

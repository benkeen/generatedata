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

const IntroDialog = ({ visible, onClose }: IntroProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ maxWidth: 500 }}>
			<DialogTitle onClose={onClose}>generatedata 4.0.0 demo</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<img src="./images/dice180x180.png" width={90} height={90} />
				<div>
					<p>
						Welcome! This is <b>NOT</b> a working site yet: it's just a demo of the
						upcoming <Link url="http://generatedata.com" offSite={true}>generatedata.com</Link> rewrite.
						So expect weird behaviour, browser crashes, horror and fury.
					</p>
					<p>
						You can follow the progress on <Link url="https://github.com/benkeen/generatedata/issues" offSite={true}>github</Link>.
					</p>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">
					Yeah, yeah.
				</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default IntroDialog;

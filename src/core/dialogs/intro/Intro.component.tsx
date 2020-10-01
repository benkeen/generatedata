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
						Welcome! This is the alpha version of generatedata v4 - the upcoming version
						of <Link url="http://generatedata.com" offSite={true}>generatedata.com</Link>. This current
						version (Oct, 2020) is functional but incomplete. Unlike the current live site which is limited
						to generating 100 rows, you're welcome to generate up to 1 <i>million</i> rows.
					</p>
					<p>
						There are no user accounts yet so you can't save your data, but that's coming next. You can
						follow the progress on <Link url="https://github.com/benkeen/generatedata/issues" offSite={true}>github</Link>.
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

import * as React from 'react';
import Button from '@material-ui/core/Button';
import { SmallDialog, DialogTitle, DialogContent, DialogActions } from '../../../components/dialogs';
import styles from './Intro.scss';

export type IntroProps = {
	visible: boolean;
	onClose: any;
	onClear: () => void;
	i18n: any;
};

const IntroDialog = ({ visible, onClose, onClear, i18n }: IntroProps): JSX.Element => (
	<SmallDialog onClose={onClose} open={visible}>
		<DialogTitle onClose={onClose}>Welcome - here be dragons!</DialogTitle>
		<DialogContent dividers className={styles.contentPanel}>
			<div>
				<p>
					Welcome to generatedata.com v4. This is <b>NOT</b> a complete script: at this stage it's just a demo
					site illustrating the new in-development script and to solicit feedback about what you do & don't like.
					Check out <a href="http://generatedata.com" target="_blank">generatedata.com</a> for the current, working script.
				</p>
				<p>
					Please report any issues on <a href="https://github.com/benkeen/generatedata/issues" target="_blank">github</a>.
				</p>
			</div>
		</DialogContent>
		<DialogActions>
			<Button onClick={onClose} color="primary" variant="outlined">
				{i18n.continue}
			</Button>
		</DialogActions>
	</SmallDialog>
);

export default IntroDialog;

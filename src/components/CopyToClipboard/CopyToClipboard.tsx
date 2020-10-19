import React from 'react';
// @ts-ignore-line
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './CopyToClipboard.scss';
import * as langUtils from '~utils/langUtils';

const Alert = (props: AlertProps): JSX.Element => <MuiAlert elevation={6} variant="filled" {...props} />;

const Copy = ({ message = 'Copied to clipboard', content }: any): JSX.Element => {
	const [open, setOpen] = React.useState(false);
	const i18n = langUtils.getStrings();

	return (
		<>
			<CopyToClipboard text={content} onCopy={(): void => setOpen(true)}>
				<FileCopyIcon fontSize="small" className={styles.copyIcon} titleAccess={i18n.core.copyToClipboard} />
			</CopyToClipboard>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				open={open}
				autoHideDuration={5000}
				onClose={(): void => setOpen(false)}
			>
				<Alert onClose={(): void => setOpen(false)} severity="success">{message}</Alert>
			</Snackbar>
		</>
	);
};

export default Copy;

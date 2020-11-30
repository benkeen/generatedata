import React from 'react';
// @ts-ignore-line
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { addToast } from '~utils/generalUtils';
import styles from './CopyToClipboard.scss';

const Copy = ({ message, tooltip, content }: any): JSX.Element => {
	const onCopy = (): void => {
		addToast({
			type: 'success',
			message,
			verticalPosition: 'bottom',
			horizontalPosition: 'right'
		});
	};

	return (
		<CopyToClipboard text={content} onCopy={onCopy}>
			<FileCopyIcon fontSize="small" className={styles.copyIcon} titleAccess={tooltip} />
		</CopyToClipboard>
	);
};

export default Copy;

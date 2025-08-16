import React from 'react';
import CopyToClipboard from '../copyToClipboard/CopyToClipboard';
import styles from './Email.scss';

export type EmailProps = {
	email: string;
	i18n: any;
	text?: string;
};

const Email = ({ email, text = '', i18n }: EmailProps): JSX.Element => {
	const textString = text || email;

	return (
		<>
			<a href={`mailto:${email}`} target="_blank" rel="noreferrer">
				{textString}
			</a>
			<CopyToClipboard
				className={styles.copy}
				content={email}
				message={i18n.emailCopiedToClipboard}
				tooltip={i18n.copiedToClipboard}
			/>
		</>
	);
};

export default Email;

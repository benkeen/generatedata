import React from 'react';
import CopyToClipboard from './copyToClipboard/CopyToClipboard';
import styles from './Email.'

const Email = ({ email }) => {

	return (
		<>
			<a href={`mailto:${email}`}>{email}</a>
			<CopyToClipboard
				className={styles.copyToClipboard}
				content={env.adminEmail}
				message={i18n.emailCopiedToClipboard}
				tooltip={i18n.copiedToClipboard}
			/>
		</>
	);
};

export default Email;

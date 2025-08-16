import React from 'react';
import { AccountStatus } from '~types/account';
import styles from './AccountStatusPill.scss';

type AccountStatusPillProps = {
	status: AccountStatus;
	i18n: any;
};

const AccountStatusPill = ({ status, i18n }: AccountStatusPillProps): JSX.Element => {
	let label;
	if (status === 'live') {
		label = i18n.live;
	} else if (status === 'expired') {
		label = i18n.expired;
	} else if (status === 'disabled') {
		label = i18n.disabled;
	}

	return <span className={`${styles.pill} ${styles[status]}`}>{label}</span>;
};

export default AccountStatusPill;

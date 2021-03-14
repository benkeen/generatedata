import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import * as styles from './AccountsList.scss';

export type AccountsListProps = {
	i18n: any;
	onInit: () => void;
	onChangeTab: (tab: any) => void;
	accounts: any[];
};


const Row = ({ i18n, firstName, lastName, email, onEdit }: any): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.firstName}>{firstName}</div>
			<div className={styles.lastName}>{lastName}</div>
			<div className={styles.email}>{email}</div>
			<div className={styles.status}>...</div>
			<div className={styles.edit}>
				<Button size="small" type="submit" color="primary" variant="outlined" onClick={onEdit}>{i18n.edit}</Button>
			</div>
			<div className={styles.del}>
				<HighlightOffIcon />
			</div>
		</div>
	);
};

const AccountsListComponent = ({ i18n, accounts, onInit }: AccountsListProps): JSX.Element => {
	useEffect(() => {
		onInit();
	}, []);

	if (!accounts.length) {
		return (
			<div>
				No accounts.
			</div>
		);
	}

	return (
		<div style={{ width: '100%', marginBottom: 20 }}>
			<div className={`${styles.row} ${styles.header}`}>
				<div className={styles.firstName}>{i18n.firstName}</div>
				<div className={styles.lastName}>{i18n.lastName}</div>
				<div className={styles.email}>{i18n.email}</div>
				<div className={styles.status}>{i18n.status}</div>
				<div className={styles.edit} />
				<div className={styles.del} />
			</div>
			<div className={styles.body}>
				{accounts.map((row: any) => (
					<Row
						key={row.accountId}
						{...row}
						i18n={i18n}
						onEdit={(): void => {}}
					/>
				))}
			</div>
		</div>
	);
};

export default AccountsListComponent;

import React from 'react';
import * as styles from '~core/account/dataSets/DataSets.scss';

const Row = ({ firstName, lastName }: any): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.dataSetName}>{firstName}</div>
			<div className={styles.dateCreated}>{lastName}</div>
			<div className={styles.del}>

			</div>
		</div>
	);
};

const AccountList = ({ i18n, accounts }: any): JSX.Element => {
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
				<div className={styles.dataSetName}>{i18n.firstName}</div>
				<div className={styles.dateCreated}>{i18n.lastName}</div>
				<div className={styles.del} />
			</div>
			<div className={styles.body}>
				{accounts.map(Row)}
			</div>
		</div>
	);
};

export default AccountList;

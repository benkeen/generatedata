import React, { useEffect } from 'react';
import * as styles from '~core/account/dataSets/DataSets.scss';
import * as accountStyles from '~core/account/Account.scss';

export type AccountsPageProps = {
	i18n: any;
	onInit: () => void;
	accounts: any[];
};

const Row = ({ dataSetName, dateCreated }: any): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.dataSetName}>{dataSetName}</div>
			<div className={styles.dateCreated}>{dateCreated}</div>
			<div className={styles.del}>

			</div>
		</div>
	);
};

const Accounts = ({ accounts, onInit }: AccountsPageProps): JSX.Element | null => {
	useEffect(() => {
		onInit();
	}, []);

	if (!accounts || !accounts.length) {
		return null;
	}

	return (
		<section className={`${accountStyles.page} ${styles.page}`}>
			<div style={{ width: '100%' }}>
				<div className={`${styles.row} ${styles.header}`}>
					<div className={styles.dataSetName}>First name</div>
					<div className={styles.dateCreated}>Last name</div>
					<div className={styles.del} />
				</div>
				<div className={styles.body}>
					{accounts.map(Row)}
				</div>
			</div>
		</section>
	);
};

export default Accounts;

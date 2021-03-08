import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
import * as styles from '~core/account/dataSets/DataSets.scss';
import * as sharedStyles from '../../styles/shared.scss';

export type AccountsPageProps = {
	i18n: any;
	selectedTab: any;
	onInit: () => void;
	onChangeTab: (tab: any) => void;
	accounts: any[];
};

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

const Accounts = ({ selectedTab, accounts, onInit, onChangeTab, i18n }: AccountsPageProps): JSX.Element | null => {
	useEffect(() => {
		onInit();
	}, []);

	if (!accounts) {
		return null;
	}

	const getTable = (): JSX.Element | null => {
		if (!accounts.length) {
			return null;
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

	return (
		<section className={sharedStyles.twoColPage}>
			<nav>
				<ul>
					<li
						className={selectedTab === 'accounts' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('accounts')}
					>
						Accounts
					</li>
					<li
						className={selectedTab === 'createAccount' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('createAccount')}
					>
						Create Account
					</li>
				</ul>
			</nav>
			<div className={sharedStyles.tab}>
				{getTable()}
			</div>
		</section>
	);

	/*
	<Button size="medium" onClick={(): void => {}} color="primary" variant="outlined">
		{i18n.createAccount}
	</Button>
	*/

};

export default Accounts;

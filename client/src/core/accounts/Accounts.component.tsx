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
					<div className={styles.dataSetName}>First name</div>
					<div className={styles.dateCreated}>Last name</div>
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
						{i18n.yourAccount}
					</li>
					<li
						className={selectedTab === 'createAccount' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('createAccount')}
					>
						{i18n.changePassword}
					</li>
				</ul>
			</nav>
			<div className={sharedStyles.tab}>

				{getTable()}

				<div>
					<div>
						<label>First name</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								value=""
								error=""
								name="firstName"
								onChange={(): void => {}}
								style={{ width: '100%' }}
								autoFocus
							/>
						</div>

						<label>Last name</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								type="password"
								error=""
								name="password"
								value=""
								onChange={(): void => {}}
								style={{ width: '100%' }}
							/>
						</div>

						<label>{i18n.email}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								value=""
								error=""
								name="email"
								onChange={(): void => {}}
								style={{ width: '100%' }}
								autoFocus
							/>
						</div>
					</div>
				</div>

				<Button size="medium" onClick={(): void => {}} color="primary" variant="outlined">
					Create Account
				</Button>

			</div>
		</section>

	);
};

export default Accounts;

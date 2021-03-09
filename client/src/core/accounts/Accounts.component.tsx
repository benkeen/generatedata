import React, { useEffect } from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '~components/TextField';
import * as sharedStyles from '../../styles/shared.scss';
import AccountList from './accountList/AccountList';
import CreateAccount from './createAccount/CreateAccount.container';

export type AccountsPageProps = {
	i18n: any;
	selectedTab: any;
	onInit: () => void;
	onChangeTab: (tab: any) => void;
	accounts: any[];
};

const Accounts = ({ selectedTab, accounts, onInit, onChangeTab, i18n }: AccountsPageProps): JSX.Element | null => {
	useEffect(() => {
		onInit();
	}, []);

	if (!accounts) {
		return null;
	}

	const getTab = (): JSX.Element | null => {
		if (selectedTab === 'accounts') {
			return (
				<AccountList
					i18n={i18n}
					accounts={accounts}
				/>
			);
		}

		return (
			<CreateAccount
				i18n={i18n}
			/>
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
						{i18n.accounts}
					</li>
					<li
						className={selectedTab === 'createAccount' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('createAccount')}
					>
						{i18n.createAccount}
					</li>
				</ul>
			</nav>
			<div className={sharedStyles.tab}>
				{getTab()}
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

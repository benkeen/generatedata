import React, { useEffect } from 'react';
import * as sharedStyles from '../../styles/shared.scss';
import AccountsList from './accountsList/AccountsList.container';
import CreateAccount from './createAccount/CreateAccount.container';
import EditAccount from './editAccount/EditAccount.container';
import { SelectedAccountsTab } from '~types/account';

export type AccountsPageProps = {
	i18n: any;
	selectedTab: SelectedAccountsTab;
	onChangeTab: (tab: any) => void;
	onDestroy: () => void;
};

const Accounts = ({
	selectedTab,
	onChangeTab,
	onDestroy,
	i18n
}: AccountsPageProps): JSX.Element | null => {
	useEffect((): any => {
		return (): void => {
			onDestroy();
		};
	}, []);

	const getTab = (): JSX.Element | null => {
		if (selectedTab === SelectedAccountsTab.accounts) {
			return <AccountsList />;
		} else if (selectedTab === SelectedAccountsTab.editAccount) {
			return <EditAccount />;
		}
		return <CreateAccount />;
	};

	return (
		<section className={sharedStyles.twoColPage}>
			<nav>
				<ul>
					<li
						className={
							selectedTab === SelectedAccountsTab.accounts
								? sharedStyles.selected
								: ''
						}
						onClick={(): void => onChangeTab(SelectedAccountsTab.accounts)}
					>
						{i18n.accounts}
					</li>
					<li
						className={
							selectedTab === SelectedAccountsTab.createAccount
								? sharedStyles.selected
								: ''
						}
						onClick={(): void => onChangeTab(SelectedAccountsTab.createAccount)}
					>
						{i18n.createAccount}
					</li>
				</ul>
			</nav>
			<div className={sharedStyles.tab}>{getTab()}</div>
		</section>
	);
};

export default Accounts;

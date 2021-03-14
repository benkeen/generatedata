import React from 'react';
import * as sharedStyles from '../../styles/shared.scss';
import AccountsList from './accountsList/AccountsList.container';
import CreateAccount from './createAccount/CreateAccount.container';
import { SelectedAccountsTab } from '~types/account';

export type AccountsPageProps = {
	i18n: any;
	selectedTab: SelectedAccountsTab;
	onChangeTab: (tab: any) => void;
};

const Accounts = ({ selectedTab, onChangeTab, i18n }: AccountsPageProps): JSX.Element | null => {
	const getTab = (): JSX.Element | null => {
		if (selectedTab === SelectedAccountsTab.accounts) {
			return (
				<AccountsList />
			);
		}

		return <CreateAccount />;
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
};

export default Accounts;

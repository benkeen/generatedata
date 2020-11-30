import React from 'react';
import { SelectedAccountTab } from '~types/account';
import YourAccount from './yourAccount/YourAccount.container';
import ChangePassword from './changePassword/ChangePassword.container';
import * as styles from './Account.scss';

export type AccountPageProps = {
	selectedTab: SelectedAccountTab;
	onChangeTab: (tab: SelectedAccountTab) => void;
	i18n: any;
};

const AccountPage = ({ selectedTab, onChangeTab, i18n }: AccountPageProps): JSX.Element => {

	const getTab = (): JSX.Element | null => {
		if (selectedTab === 'dataSets') {
			return null;
		} else if (selectedTab === 'yourAccount') {
			return <YourAccount />;
		}

		return <ChangePassword />;
	};

	return (
		<section className={styles.page}>
			<nav>
				<ul>
					<li
						className={selectedTab === 'dataSets' ? styles.selected : ''}
						onClick={(): void => onChangeTab('dataSets')}
					>
						{i18n.dataSets}
					</li>
					<li
						className={selectedTab === 'yourAccount' ? styles.selected : ''}
						onClick={(): void => onChangeTab('yourAccount')}
					>
						{i18n.yourAccount}
					</li>
					<li
						className={selectedTab === 'changePassword' ? styles.selected : ''}
						onClick={(): void => onChangeTab('changePassword')}
					>
						{i18n.changePassword}
					</li>
				</ul>
			</nav>
			<div className={styles.tab}>
				{getTab()}
			</div>
		</section>
	);
};

export default AccountPage;











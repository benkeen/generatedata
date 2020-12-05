import React, { useEffect, useState } from 'react';
import { SelectedAccountTab } from '~types/account';
import YourAccount from './yourAccount/YourAccount.container';
import ChangePassword from './changePassword/ChangePassword.container';
import * as sharedStyles from '../../styles/shared.scss';
import styles from './Account.scss';

export type AccountPageProps = {
	selectedTab: SelectedAccountTab;
	onChangeTab: (tab: SelectedAccountTab) => void;
	i18n: any;
};

const AccountPage = ({ selectedTab, onChangeTab }: AccountPageProps): JSX.Element => {
	const [yourAccountClasses, setYourAccountClasses] = useState(styles.hidden);
	const [changePasswordClasses, setChangePasswordClasses] = useState(styles.hidden);

	useEffect(() => {
		if (selectedTab === 'yourAccount') {
			setChangePasswordClasses(styles.hidden);
			setYourAccountClasses(styles.shown);
		} else {
			setChangePasswordClasses(styles.shown);
			setYourAccountClasses(styles.hidden);
		}
	}, [selectedTab]);

	const getTab = (): JSX.Element | null => {
		if (selectedTab === 'yourAccount') {
			return <YourAccount className={yourAccountClasses} />;
		}

		return <ChangePassword className={changePasswordClasses} />;
	};

	return (
		<section className={sharedStyles.twoColPage}>
			<nav>
				<ul>
					<li
						className={selectedTab === 'yourAccount' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('yourAccount')}
					>
						Accounts
					</li>
					<li
						className={selectedTab === 'changePassword' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('changePassword')}
					>
						Create Account
					</li>
				</ul>
			</nav>
			<div className={`${sharedStyles.tab} ${styles.accountPage}`}>
				{getTab()}
			</div>
		</section>
	);
};

export default AccountPage;











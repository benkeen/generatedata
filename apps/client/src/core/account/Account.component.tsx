import React, { useEffect, useState } from 'react';
import { SelectedAccountTab } from '~types/account';
import DataSets from './dataSets/DataSets.container';
import YourAccount from './yourAccount/YourAccount.container';
import ChangePassword from './changePassword/ChangePassword.container';
import sharedStyles from '../../styles/shared.scss';
import styles from './Account.scss';

export type AccountPageProps = {
	selectedTab: SelectedAccountTab;
	onChangeTab: (tab: SelectedAccountTab) => void;
	i18n: any;
};

const AccountPage = ({ selectedTab, onChangeTab, i18n }: AccountPageProps) => {
	const [dataSetsClasses, setDataSetsClasses] = useState(styles.hidden);
	const [yourAccountClasses, setYourAccountClasses] = useState(styles.hidden);
	const [changePasswordClasses, setChangePasswordClasses] = useState(styles.hidden);

	useEffect(() => {
		let dsClasses = styles.hidden;
		let cpClasses = styles.hidden;
		let yaClasses = styles.hidden;

		if (selectedTab === SelectedAccountTab.yourAccount) {
			yaClasses = styles.shown;
		} else if (selectedTab === SelectedAccountTab.dataSets) {
			dsClasses = styles.shown;
		} else {
			cpClasses = styles.shown;
		}

		setDataSetsClasses(dsClasses);
		setChangePasswordClasses(cpClasses);
		setYourAccountClasses(yaClasses);
	}, [selectedTab]);

	const getTab = () => {
		if (selectedTab === SelectedAccountTab.dataSets) {
			return <DataSets className={dataSetsClasses} />;
		}
		if (selectedTab === SelectedAccountTab.yourAccount) {
			return <YourAccount className={yourAccountClasses} />;
		}

		return <ChangePassword className={changePasswordClasses} />;
	};

	return (
		<section className={sharedStyles.twoColPage} data-automation="account-page">
			<nav>
				<ul>
					<li
						className={selectedTab === SelectedAccountTab.dataSets ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab(SelectedAccountTab.dataSets)}
					>
						{i18n.dataSets}
					</li>
					<li
						className={selectedTab === SelectedAccountTab.yourAccount ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab(SelectedAccountTab.yourAccount)}
					>
						{i18n.yourAccount}
					</li>
					<li
						className={selectedTab === SelectedAccountTab.changePassword ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab(SelectedAccountTab.changePassword)}
					>
						{i18n.changePassword}
					</li>
				</ul>
			</nav>
			<div className={sharedStyles.tab}>{getTab()}</div>
		</section>
	);
};

export default AccountPage;

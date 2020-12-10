import React, { useEffect, useState } from 'react';
import { SelectedAccountTab } from '~types/account';
import DataSets from './dataSets/DataSets.container';
import YourAccount from './yourAccount/YourAccount.container';
import ChangePassword from './changePassword/ChangePassword.container';
import * as sharedStyles from '../../styles/shared.scss';
import styles from './Account.scss';

export type AccountPageProps = {
	selectedTab: SelectedAccountTab;
	onChangeTab: (tab: SelectedAccountTab) => void;
	i18n: any;
};

const AccountPage = ({ selectedTab, onChangeTab, i18n }: AccountPageProps): JSX.Element => {
	const [dataSetsClasses, setDataSetsClasses] = useState(styles.hidden);
	const [yourAccountClasses, setYourAccountClasses] = useState(styles.hidden);
	const [changePasswordClasses, setChangePasswordClasses] = useState(styles.hidden);

	useEffect(() => {
		if (selectedTab === 'yourAccount') {
			setDataSetsClasses(styles.hidden);
			setChangePasswordClasses(styles.hidden);
			setYourAccountClasses(styles.shown);
		} else if (selectedTab === 'dataSets') {
			setDataSetsClasses(styles.shown);
			setChangePasswordClasses(styles.hidden);
			setYourAccountClasses(styles.hidden);
		} else {
			setDataSetsClasses(styles.hidden);
			setChangePasswordClasses(styles.shown);
			setYourAccountClasses(styles.hidden);
		}
	}, [selectedTab]);

	const getTab = (): JSX.Element | null => {
		if (selectedTab === 'dataSets') {
			return <DataSets className={dataSetsClasses}/>;
		}
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
						className={selectedTab === 'dataSets' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('dataSets')}
					>
						{i18n.dataSets}
					</li>
					<li
						className={selectedTab === 'yourAccount' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('yourAccount')}
					>
						{i18n.yourAccount}
					</li>
					<li
						className={selectedTab === 'changePassword' ? sharedStyles.selected : ''}
						onClick={(): void => onChangeTab('changePassword')}
					>
						{i18n.changePassword}
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











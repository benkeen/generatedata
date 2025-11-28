import React, { useEffect, useState } from 'react';
import { SelectedAccountTab } from '~types/account';
import DataSets from './dataSets/DataSets.container';
import YourAccount from './yourAccount/YourAccount.container';
import ChangePassword from './changePassword/ChangePassword.container';
import { useSharedClasses } from '@generatedata/core';
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
  const sharedClasses = useSharedClasses();

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
    <section className={sharedClasses.twoColPage} data-automation="account-page">
      <nav>
        <ul>
          <li
            className={selectedTab === SelectedAccountTab.dataSets ? sharedClasses.selected : ''}
            onClick={(): void => onChangeTab(SelectedAccountTab.dataSets)}
          >
            {i18n.dataSets}
          </li>
          <li
            className={selectedTab === SelectedAccountTab.yourAccount ? sharedClasses.selected : ''}
            onClick={(): void => onChangeTab(SelectedAccountTab.yourAccount)}
          >
            {i18n.yourAccount}
          </li>
          <li
            className={selectedTab === SelectedAccountTab.changePassword ? sharedClasses.selected : ''}
            onClick={(): void => onChangeTab(SelectedAccountTab.changePassword)}
          >
            {i18n.changePassword}
          </li>
        </ul>
      </nav>
      <div className={sharedClasses.tab}>{getTab()}</div>
    </section>
  );
};

export default AccountPage;

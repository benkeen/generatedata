import React, { useEffect } from 'react';
import AccountsList from './accountsList/AccountsList.container';
import CreateAccount from './createAccount/CreateAccount.container';
import EditAccount from './editAccount/EditAccount.container';
import { SelectedAccountsTab } from '~types/account';
import { useSharedClasses } from '@generatedata/shared';

export type AccountsPageProps = {
  i18n: any;
  selectedTab: SelectedAccountsTab;
  onChangeTab: (tab: any) => void;
  onDestroy: () => void;
};

const Accounts = ({ selectedTab, onChangeTab, onDestroy, i18n }: AccountsPageProps) => {
  const sharedClasses = useSharedClasses();

  useEffect((): any => {
    return (): void => {
      onDestroy();
    };
  }, []);

  const getTab = () => {
    if (selectedTab === 'accounts') {
      return <AccountsList />;
    } else if (selectedTab === 'editAccount') {
      return <EditAccount />;
    }
    return <CreateAccount />;
  };

  return (
    <section className={sharedClasses.twoColPage}>
      <nav>
        <ul>
          <li className={selectedTab === 'accounts' ? sharedClasses.selected : ''} onClick={(): void => onChangeTab('accounts')}>
            {i18n.accounts}
          </li>
          <li className={selectedTab === 'createAccount' ? sharedClasses.selected : ''} onClick={(): void => onChangeTab('createAccount')}>
            {i18n.createAccount}
          </li>
        </ul>
      </nav>
      <div className={sharedClasses.tab}>{getTab()}</div>
    </section>
  );
};

export default Accounts;

import { useSharedClasses } from '@generatedata/shared';
import { useEffect, useState } from 'react';
import { SelectedAccountTab } from '~types/account';
import { useClasses } from './Account.styles';
import ChangePassword from './changePassword/ChangePassword.container';
import DataSets from './dataSets/DataSets.container';
import YourAccount from './yourAccount/YourAccount.container';

export type AccountPageProps = {
  selectedTab: SelectedAccountTab;
  onChangeTab: (tab: SelectedAccountTab) => void;
  i18n: any;
};

const AccountPage = ({ selectedTab, onChangeTab, i18n }: AccountPageProps) => {
  const classNames = useClasses();
  const [dataSetsClasses, setDataSetsClasses] = useState(classNames.hidden);
  const [yourAccountClasses, setYourAccountClasses] = useState(classNames.hidden);
  const [changePasswordClasses, setChangePasswordClasses] = useState(classNames.hidden);
  const sharedClasses = useSharedClasses();

  useEffect(() => {
    let dataSetsClasses = classNames.hidden;
    let changePasswordClasses = classNames.hidden;
    let yourAccountClasses = classNames.hidden;

    if (selectedTab === SelectedAccountTab.yourAccount) {
      yourAccountClasses = classNames.shown;
    } else if (selectedTab === SelectedAccountTab.dataSets) {
      dataSetsClasses = classNames.shown;
    } else {
      changePasswordClasses = classNames.shown;
    }

    setDataSetsClasses(dataSetsClasses);
    setChangePasswordClasses(changePasswordClasses);
    setYourAccountClasses(yourAccountClasses);
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

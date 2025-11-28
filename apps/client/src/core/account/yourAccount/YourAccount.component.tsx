import C from '@generatedata/config/constants';
import { formatUnixTime } from '@generatedata/utils/date';
import { getFormattedNum } from '@generatedata/utils/number';
import { useEffect } from 'react';
import MainFields from '~components/accounts/mainFields/MainFields.component';
import { AccountEditingData } from '~store/account/account.reducer';
import { useClasses } from '../Account.styles';

export type YourAccountProps = {
  data: AccountEditingData;
  numGeneratedRows: number;
  accountHasChanges: boolean;
  updateAccount: (data: AccountEditingData) => void;
  expiryDate: string;
  onInit: () => void;
  onSave: () => void;
  onCancel: () => void;
  className: string;
  i18n: any;
};

const YourAccount = ({
  data,
  numGeneratedRows,
  accountHasChanges,
  updateAccount,
  onSave,
  onCancel,
  className,
  i18n,
  onInit,
  expiryDate
}: YourAccountProps) => {
  const classNames = useClasses();
  useEffect(() => {
    onInit();
  }, []);

  const getExpiryDate = () => {
    if (!expiryDate) {
      return null;
    }

    return (
      <div className={classNames.rightBlock}>
        <label>{i18n.accountExpiryDate}</label>
        <div>{formatUnixTime(parseInt(expiryDate) / 1000, C.DATE_FORMAT)}</div>
      </div>
    );
  };

  return (
    <div className={`${className} ${classNames.yourAccountPage}`}>
      <MainFields
        accountHasChanges={accountHasChanges}
        data={data}
        onSave={onSave}
        onCancel={onCancel}
        updateAccount={updateAccount}
        i18n={i18n}
        submitButtonLabel={i18n.save}
        showRequiredFieldError={true}
        isAddingUser={false}
      />
      <div className={classNames.yourAccountRightCol}>
        <div className={classNames.rightCol}>
          <div className={classNames.rightBlock}>
            <label>{i18n.totalNumGeneratedRows}</label>
            <div>{getFormattedNum(numGeneratedRows)}</div>
          </div>
          {getExpiryDate()}
        </div>
      </div>
    </div>
  );
};

export default YourAccount;

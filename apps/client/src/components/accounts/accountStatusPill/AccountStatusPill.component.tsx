import { AccountStatus } from '@generatedata/graphql-schema';
import { useClasses } from './AccountStatusPill.styles';

type AccountStatusPillProps = {
  status: AccountStatus;
  i18n: any;
};

const AccountStatusPill = ({ status, i18n }: AccountStatusPillProps) => {
  const classNames = useClasses();
  let label;
  if (status === 'live') {
    label = i18n.live;
  } else if (status === 'expired') {
    label = i18n.expired;
  } else if (status === 'disabled') {
    label = i18n.disabled;
  }

  return <span className={`${classNames.pill} ${classNames[status]}`}>{label}</span>;
};

export default AccountStatusPill;

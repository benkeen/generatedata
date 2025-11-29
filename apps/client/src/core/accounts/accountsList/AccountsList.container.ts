import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ColSortDir } from '~components/tables/TableHeader.component';
import * as accountActions from '~store/account/account.actions';
import * as selectors from '~store/generator/generator.selectors';
import * as mainActions from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';
import { AccountStatusFilter, Store } from '~types/general';
import AccountsList, { AccountsListProps } from './AccountsList.component';

const mapStateToProps = (
  state: Store
): Pick<
  AccountsListProps,
  'accountsCurrentPage' | 'accountsSortCol' | 'accountsSortDir' | 'accountsFilterStr' | 'accountStatusFilter' | 'i18n'
> => ({
  accountsCurrentPage: mainSelectors.getAccountsCurrentPage(state),
  accountsSortCol: mainSelectors.getAccountsSortCol(state),
  accountsSortDir: mainSelectors.getAccountsSortDir(state),
  accountsFilterStr: mainSelectors.getAccountsFilterStr(state),
  accountStatusFilter: mainSelectors.getAccountStatusFilter(state),
  i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<
  AccountsListProps,
  | 'onEditAccount'
  | 'setAccountsSortCol'
  | 'setAccountsSortDir'
  | 'setAccountsCurrentPage'
  | 'setAccountStatusFilter'
  | 'setAccountsFilterString'
> => ({
  onEditAccount: (accountInfo: any): any => dispatch(accountActions.editAccount(accountInfo)),
  setAccountsSortDir: (sortDir: ColSortDir): void => dispatch(mainActions.setAccountsSortDir(sortDir)),
  setAccountsSortCol: (sortCol: string): void => dispatch(mainActions.setAccountsSortCol(sortCol)),
  setAccountsCurrentPage: (page: number): void => dispatch(mainActions.setAccountsCurrentPage(page)),
  setAccountsFilterString: (filter: string): void => dispatch(mainActions.setAccountsFilterString(filter)),
  setAccountStatusFilter: (status: AccountStatusFilter): void => dispatch(mainActions.setAccountStatusFilter(status))
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(AccountsList);

export default container;

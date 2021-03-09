import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountsSelectors from '~store/accounts/accounts.selectors';
import * as accountsActions from '~store/accounts/accounts.actions';
import * as accountSelectors from '~store/account/account.selectors';
import * as accountActions from '~store/account/account.actions';
import AccountsPage, { AccountsPageProps } from './Accounts.component';
import { SelectedAccountsTab } from '~types/account';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<AccountsPageProps> => ({
	i18n: selectors.getCoreI18n(state),
	accounts: accountsSelectors.getAccounts(state),
	selectedTab: accountSelectors.getSelectedAccountsPageTab(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountsPageProps> => ({
	onInit: (): any => dispatch(accountsActions.getAccounts()),
	onChangeTab: (tab: SelectedAccountsTab): any => dispatch(accountActions.onChangeAccountsTab(tab))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountsPage);

export default container;

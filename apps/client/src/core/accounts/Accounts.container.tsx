import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountSelectors from '~store/account/account.selectors';
import * as accountActions from '~store/account/account.actions';
import AccountsPage, { AccountsPageProps } from './Accounts.component';
import { SelectedAccountsTab } from '~types/account';
import { Store } from '~types/general';
import { withAuth } from '~core/auth/withAuth';

const mapStateToProps = (state: Store): Partial<AccountsPageProps> => ({
	i18n: selectors.getCoreI18n(state),
	selectedTab: accountSelectors.getSelectedAccountsPageTab(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountsPageProps> => ({
	onChangeTab: (tab: SelectedAccountsTab): any => dispatch(accountActions.onChangeAccountsTab(tab)),
	onDestroy: (): any => dispatch(accountActions.onCleanupAccountsPage())
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(AccountsPage);

export default withAuth(container);

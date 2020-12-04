import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountsSelectors from '~store/accounts/accounts.selectors';
import * as accountsActions from '~store/accounts/accounts.actions';
import AccountsPage, { AccountsPageProps } from './Accounts.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<AccountsPageProps> => ({
	i18n: selectors.getCoreI18n(state),
	accounts: accountsSelectors.getAccounts(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountsPageProps> => ({
	onInit: (): any => dispatch(accountsActions.getAccounts())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountsPage);

export default container;

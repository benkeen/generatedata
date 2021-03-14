import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountsSelectors from '~store/accounts/accounts.selectors';
import AccountsList, { AccountsListProps } from './AccountsList.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<AccountsListProps> => ({
	i18n: selectors.getCoreI18n(state),
	accounts: accountsSelectors.getAccounts(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountsListProps> => ({
	// onInit: (): any => dispatch(accountsActions.getAccounts())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountsList);

export default container;

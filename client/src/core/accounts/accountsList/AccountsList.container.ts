import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountActions from '~store/account/account.actions';
import AccountsList, { AccountsListProps } from './AccountsList.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<AccountsListProps> => ({
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountsListProps> => ({
	onEditAccount: (accountInfo: any): any => dispatch(accountActions.editAccount(accountInfo))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountsList);

export default container;

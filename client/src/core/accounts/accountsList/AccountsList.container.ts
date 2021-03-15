import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import AccountsList, { AccountsListProps } from './AccountsList.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<AccountsListProps> => ({
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (): Partial<AccountsListProps> => ({
	// onInit: (): any => dispatch(accountsActions.getAccounts())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountsList);

export default container;

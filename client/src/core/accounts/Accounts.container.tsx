import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import AccountsPage, { AccountsPageProps } from './Accounts.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<AccountsPageProps> => ({
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountsPageProps> => ({
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountsPage);

export default container;

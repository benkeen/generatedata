import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountActions from '~store/account/account.actions';
import AccountPage, { AccountPageProps } from './Account.component';
import { withAuth } from '../auth/withAuth';

const mapStateToProps = (state: any): Partial<AccountPageProps> => ({
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountPageProps> => ({
	// @ts-ignore-line
	getAccount: () => dispatch(accountActions.getAccount())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPage);

export default withAuth(container);

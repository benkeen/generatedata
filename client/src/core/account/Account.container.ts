import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountSelectors from '~store/account/account.selectors';
import * as accountActions from '../store/account/account.actions';
import AccountPage, { AccountPageProps } from './Account.component';
import { withAuth } from '../auth/withAuth';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<AccountPageProps> => ({
	firstName: accountSelectors.getFirstName(state),
	lastName: accountSelectors.getLastName(state),
	email: accountSelectors.getEmail(state),
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountPageProps> => ({
	// @ts-ignore-line
	updateAccount: (): any => dispatch(accountActions.updateAccount())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPage);

export default withAuth(container);

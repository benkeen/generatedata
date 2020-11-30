import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountActions from '~store/account/account.actions';
import * as accountSelectors from '~store/account/account.selectors';
import AccountPage, { AccountPageProps } from './Account.component';
import { withAuth } from '../auth/withAuth';
import { Store } from '~types/general';
import { SelectedAccountTab } from '~types/account';

const mapStateToProps = (state: Store): Partial<AccountPageProps> => ({
	i18n: selectors.getCoreI18n(state),
	selectedTab: accountSelectors.getSelectedTab(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<AccountPageProps> => ({
	onChangeTab: (tab: SelectedAccountTab): any => dispatch(accountActions.onChangeTab(tab))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPage);

export default withAuth(container);

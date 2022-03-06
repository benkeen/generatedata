import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountActions from '~store/account/account.actions';
import * as actionSelectors from '~store/account/account.selectors';
import ManageAccount, {
	ExpiryOption,
	ManageAccountProps,
	ManageAccountState
} from '~components/accounts/manageAccount/ManageAccount.component';
import { Store } from '~types/general';
import { SelectedAccountsTab } from '~types/account';

const mapStateToProps = (state: Store): Partial<ManageAccountProps> => {
	const i18n = selectors.getCoreI18n(state);
	const initialState = actionSelectors.getEditingData(state);

	return {
		initialState: {
			...initialState,
			expiry: initialState.expiryDate ? ExpiryOption.date : ExpiryOption.none,
			isAddingUser: false
		} as ManageAccountState,
		i18n,
		submitButtonLabel: i18n.updateAccount
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<ManageAccountProps> => ({
	// @ts-ignore-line
	onSave: (data: any): any => dispatch(accountActions.saveAccount(data)),
	onCancel: (): any => dispatch(accountActions.onChangeAccountsTab(SelectedAccountsTab.accounts))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageAccount);

export default container;

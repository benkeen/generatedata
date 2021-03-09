import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountSelectors from '~store/account/account.selectors';
import * as accountActions from '~store/account/account.actions';
import { AccountEditingData } from '~store/account/account.reducer';
import ManageAccount, { ManageAccountProps } from '../../components/accounts/manageAccount/ManageAccount.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<ManageAccountProps> => {
	const i18n = selectors.getCoreI18n(state);
	return {
		data: accountSelectors.getCreateAccountData(state),
		accountHasChanges: accountSelectors.accountHasChanges(state),
		i18n,
		submitButtonLabel: i18n.createAccount
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<ManageAccountProps> => ({
	updateAccount: (data: AccountEditingData): any => dispatch(accountActions.updateCreateAccountData(data)),
	onCancel: (): any => dispatch(accountActions.cancelChanges()),
	onSave: (): any => dispatch(accountActions.saveChanges()),
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageAccount);

export default container;

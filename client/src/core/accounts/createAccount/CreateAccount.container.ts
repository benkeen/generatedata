import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountActions from '~store/account/account.actions';
import ManageAccount, { ManageAccountState, ManageAccountProps, ExpiryOption } from '../../../components/accounts/manageAccount/ManageAccount.component';
import { Store } from '~types/general';

const initialState: ManageAccountState = {
	firstName: '',
	lastName: '',
	email: '',
	country: '',
	region: '',
	disabled: false,
	expiry: ExpiryOption.none,
	expiryDate: null
};

const mapStateToProps = (state: Store): Partial<ManageAccountProps> => {
	const i18n = selectors.getCoreI18n(state);
	return {
		initialState,
		i18n,
		submitButtonLabel: i18n.createAccount
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<ManageAccountProps> => ({
	// @ts-ignore-line
	onSave: (data: any): any => dispatch(accountActions.createAccount(data))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageAccount);

export default container;

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import * as accountActions from '~store/account/account.actions';
import ChangePassword, { ChangePasswordProps } from './ChangePassword.component';
import { Store } from '~types/general';

const mapStateToProps = (state: Store): Partial<ChangePasswordProps> => ({
	i18n: selectors.getCoreI18n(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<ChangePasswordProps> => ({
	onSave: (currentPassword: string, newPassword: string, onSuccess: () => void, onError: () => void): any => (
		dispatch(accountActions.savePassword(currentPassword, newPassword, onSuccess, onError))
	)
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePassword);

export default container;

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as mainSelectors from '~store/main/main.selectors';
import PasswordReset, { PasswordResetDialogProps } from './PasswordReset.component';
import * as mainActions from '~store/main/main.actions';

const mapStateToProps = (state: any): Partial<PasswordResetDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	visible: mainSelectors.shouldShowPasswordResetDialog(state),
	isLoggingIn: mainSelectors.isLoggingIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<PasswordResetDialogProps> => ({
	onClose: (): any => dispatch(mainActions.setLoginDialogVisibility(false)),
	onExited: (): any => mainActions.clearLoginFlow(),
	onSubmit: (email: string, onLoginError: Function): any => {
		//dispatch(mainActions.login(email, onLoginError))
	},
	showLoginDialog: () => {
		dispatch(mainActions.setLoginDialogVisibility(true));
		dispatch(mainActions.setPasswordResetDialogVisibility(false));
	}
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordReset);

export default container;

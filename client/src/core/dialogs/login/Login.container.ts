import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as mainSelectors from '~store/main/main.selectors';
import LoginDialog, { LoginDialogProps } from './Login.component';
import * as mainActions from '~store/main/main.actions';

const mapStateToProps = (state: any): Partial<LoginDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	visible: mainSelectors.shouldShowLoginDialog(state),
	isLoggingIn: mainSelectors.isLoggedIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<LoginDialogProps> => ({
	onClose: (): any => dispatch(mainActions.setLoginDialogVisibility(false)),
	onExited: (): any => mainActions.clearLoginFlow(),
	onSubmit: (email: string, password: string, onLoginError: Function): any => dispatch(mainActions.login(email, password, onLoginError))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginDialog);

export default container;

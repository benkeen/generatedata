import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as mainSelectors from '~store/main/main.selectors';
import LoginDialog, { LoginDialogProps } from './Login.component';
import * as mainActions from '~store/main/main.actions';


const mapStateToProps = (state: any): Partial<LoginDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	visible: mainSelectors.shouldShowLoginDialog(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<LoginDialogProps> => ({
	onClose: (): any => dispatch(mainActions.toggleLoginDialog())
	// onSubmit: (email: string, password: string): any => dispatch(mainActions.login(email, password))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginDialog);

export default container;

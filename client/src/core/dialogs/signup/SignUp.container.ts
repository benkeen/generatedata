import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as mainSelectors from '~store/main/main.selectors';
import SignUpDialog, { SignUpDialogProps } from './SignUp.component';
import * as mainActions from '~store/main/main.actions';


const mapStateToProps = (state: any): Partial<SignUpDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	visible: mainSelectors.shouldShowSignUpDialog(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<SignUpDialogProps> => ({
	onClose: (): any => dispatch(mainActions.toggleSignUpDialog())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpDialog);

export default container;

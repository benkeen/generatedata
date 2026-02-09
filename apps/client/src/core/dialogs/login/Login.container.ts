import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as mainActions from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';
import LoginDialog, { LoginDialogProps } from './Login.component';

const mapStateToProps = (state: any): Pick<LoginDialogProps, 'i18n' | 'visible' | 'dialogProcessing' | 'defaultEmail'> => ({
  i18n: selectors.getCoreI18n(state),
  visible: mainSelectors.shouldShowLoginDialog(state),
  dialogProcessing: mainSelectors.isDialogProcessing(state),
  defaultEmail: mainSelectors.getLoginDefaultEmail(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<LoginDialogProps, 'onClose' | 'onExited' | 'onSubmit' | 'showPasswordResetDialog'> => ({
  onClose: (): any => dispatch(mainActions.setLoginDialogVisibility(false)),
  onExited: (): any => dispatch(mainActions.clearLoginFlow()),
  onSubmit: (email: string, password: string, navigate: any, onLoginError: (err: string) => void): any => {
    dispatch(mainActions.login(email, password, navigate, onLoginError));
  },
  showPasswordResetDialog: (email: string): void => {
    dispatch(mainActions.setLoginDialogVisibility(false));
    dispatch(mainActions.setPasswordResetDialogVisibility(true, email));
  }
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(LoginDialog);

export default container;

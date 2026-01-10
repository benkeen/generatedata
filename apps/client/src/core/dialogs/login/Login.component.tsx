import { Dialog, DialogActions, DialogContent, DialogLoadingSpinner, DialogTitle, PrimaryButton, TextField } from '@generatedata/core';
import { getVendorLoginButtons, hasVendorLogin } from '@generatedata/utils/auth';
import { isValidEmail } from '@generatedata/utils/general';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useClasses } from './Login.styles';
import { enqueueSnackbar } from 'notistack';

const showVendorLoginColumn = hasVendorLogin();
const vendorLoginButtons = getVendorLoginButtons();

export type LoginDialogProps = {
  visible: boolean;
  defaultEmail: string;
  dialogProcessing: boolean;
  onClose: () => void;
  onExited: () => void;
  onSubmit: (email: string, password: string, navigate: any, onError: Function) => void;
  showPasswordResetDialog: (email: string) => void;
  i18n: any;
};

/**
 * The login dialog has baked-in support for standard logging into our database, but also optionally supports
 * logging in via external vendors: Google, Facebook and Github.
 */
const LoginDialog = ({
  visible,
  defaultEmail,
  onClose,
  dialogProcessing,
  onSubmit,
  onExited,
  showPasswordResetDialog,
  i18n
}: LoginDialogProps) => {
  const navigate = useNavigate();
  const classNames = useClasses();

  const textFieldRef = useRef<any>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [autoFocusPasswordField, shouldAutoFocusPasswordField] = useState(false);
  const passwordFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!visible) {
      setEmail('');
      setPassword('');
      return;
    }
  }, [visible]);

  useEffect(() => {
    if (email === '' && defaultEmail) {
      setEmail(defaultEmail);
      shouldAutoFocusPasswordField(true);
    }
  }, [defaultEmail]);

  const onLogin = (e: any): void => {
    e.preventDefault();

    let eError = '';
    if (!email.trim()) {
      eError = i18n.validationNoEmail;
    } else if (!isValidEmail(email)) {
      eError = i18n.validationInvalidEmail;
    }
    setEmailError(eError);

    const pError = password ? '' : i18n.validationNoPassword;
    setPasswordError(pError);

    if (!eError && !pError) {
      onSubmit(email, password, navigate, (error: string) => {
        let errorMessage = i18n.userNotFound;
        if (error === 'accountExpired') {
          errorMessage = i18n.accountExpiredMsg;
        }

        enqueueSnackbar(errorMessage, { variant: 'error' });

        if (passwordFieldRef && passwordFieldRef.current) {
          passwordFieldRef.current.select();
          passwordFieldRef.current.focus();
        }
      });
    }
  };

  const updateEmail = (email: string): void => {
    if (emailError) {
      setEmailError('');
    }
    setEmail(email);
  };

  const updatePassword = (password: string): void => {
    if (passwordError) {
      setPasswordError('');
    }
    setPassword(password);
  };

  let width = 380;
  let layoutClass = '';

  if (showVendorLoginColumn) {
    width = 500;
    layoutClass = classNames.withSecondCol;
  }

  const getSecondColumn = () => {
    if (!showVendorLoginColumn) {
      return null;
    }

    // @ts-ignore-line
    const buttons = vendorLoginButtons.map((VendorButton, index) => <VendorButton key={index} />);

    return (
      <>
        <div className={classNames.separator}>
          <div>{i18n.or}</div>
        </div>
        <div className={classNames.col}>{buttons}</div>
      </>
    );
  };

  const onEntered = (): void => {
    if (autoFocusPasswordField) {
      passwordFieldRef?.current?.focus();
      shouldAutoFocusPasswordField(false);
    }
  };

  const onPastePassword = (e: any): void => {
    const pwd = (e.clipboardData || window.clipboardData).getData('text');
    if (!password && pwd) {
      setPassword(pwd.trim());
    }
  };

  return (
    <>
      <Dialog
        onClose={onClose}
        open={visible}
        className={classNames.loginDialog}
        TransitionProps={{
          onEntered,
          onExited
        }}
      >
        <form onSubmit={onLogin}>
          <div style={{ width }}>
            <DialogTitle onClose={onClose}>{i18n.login}</DialogTitle>
            <DialogContent dividers>
              <div className={layoutClass}>
                <div className={classNames.col}>
                  <label htmlFor="emailField">{i18n.email}</label>
                  <div style={{ marginBottom: 15 }}>
                    <TextField
                      id="emailField"
                      ref={textFieldRef}
                      value={email}
                      error={emailError}
                      name="email"
                      onChange={(e: any): void => updateEmail(e.target.value)}
                      style={{ width: '100%' }}
                      disabled={dialogProcessing}
                      throttle={false}
                      autoFocus
                    />
                  </div>

                  <label htmlFor="passwordField">{i18n.password}</label>
                  <div style={{ marginBottom: 15 }}>
                    <TextField
                      type="password"
                      id="passwordField"
                      error={passwordError}
                      ref={passwordFieldRef}
                      name="password"
                      value={password}
                      onChange={(e: any): void => updatePassword(e.target.value)}
                      style={{ width: '100%' }}
                      disabled={dialogProcessing}
                      throttle={false}
                      onPaste={onPastePassword}
                      autoComplete="false"
                    />
                  </div>
                </div>
                {getSecondColumn()}
              </div>
            </DialogContent>
            <DialogActions className={classNames.actionsRow}>
              <div className={classNames.forgotPasswordLink} onClick={(): void => showPasswordResetDialog(email)}>
                {i18n.forgottenYourPasswordQ}
              </div>
              <PrimaryButton type="submit" disabled={dialogProcessing}>
                {i18n.login}
              </PrimaryButton>
            </DialogActions>
          </div>
        </form>
        <DialogLoadingSpinner visible={dialogProcessing} />
      </Dialog>
    </>
  );
};

export default LoginDialog;

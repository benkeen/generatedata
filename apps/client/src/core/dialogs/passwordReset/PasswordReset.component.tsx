import { Dialog, DialogActions, DialogContent, DialogLoadingSpinner, DialogTitle, PrimaryButton, TextField } from '@generatedata/core';
import { isValidEmail } from '@generatedata/utils/general';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useEffect, useRef, useState } from 'react';
import { useClasses } from './PasswordReset.styles';

export type PasswordResetDialogProps = {
  visible: boolean;
  dialogProcessing: boolean;
  defaultEmail: string;
  onClose: () => void;
  onSubmit: (email: string, onError: Function) => void;
  showLoginDialog: (email: string) => void;
  i18n: any;
};

const PasswordResetDialog = ({
  visible,
  onClose,
  dialogProcessing,
  onSubmit,
  showLoginDialog,
  defaultEmail,
  i18n
}: PasswordResetDialogProps) => {
  const textFieldRef = useRef<any>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const classNames = useClasses();

  useEffect(() => {
    if (!visible) {
      setEmail('');
      return;
    }
  }, [visible]);

  useEffect(() => {
    setEmail(defaultEmail);
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

    if (!eError) {
      onSubmit(email, () => {
        // addToast({
        // 	type: 'error',
        // 	message: i18n.userNotFound
        // });
        //
        // if (textFieldRef && textFieldRef.current) {
        // 	textFieldRef.current.select();
        // 	textFieldRef.current.focus();
        // }
      });
    }
  };

  const updateEmail = (email: string): void => {
    if (emailError) {
      setEmailError('');
    }
    setEmail(email);
  };

  return (
    <Dialog onClose={onClose} open={visible} className={classNames.loginDialog}>
      <form onSubmit={onLogin}>
        <div style={{ width: 380 }}>
          <DialogTitle onClose={onClose}>{i18n.passwordReset}</DialogTitle>
          <DialogContent dividers>
            <label>{i18n.email}</label>
            <div style={{ marginBottom: 15 }}>
              <TextField
                ref={textFieldRef}
                value={email}
                error={emailError}
                name="email"
                onChange={(e: any): void => updateEmail(e.target.value)}
                style={{ width: '100%' }}
                disabled={dialogProcessing}
                autoFocus
              />
            </div>
          </DialogContent>
          <DialogActions className={classNames.actionsRow}>
            <div className={classNames.loginLink} onClick={(): void => showLoginDialog(email)}>
              <div>
                <ArrowLeftIcon />
                {i18n.backToLogin}
              </div>
            </div>
            <PrimaryButton type="submit" disabled={dialogProcessing}>
              {i18n.sendEmail}
            </PrimaryButton>
          </DialogActions>
        </div>
      </form>
      <DialogLoadingSpinner visible={dialogProcessing} />
    </Dialog>
  );
};

export default PasswordResetDialog;

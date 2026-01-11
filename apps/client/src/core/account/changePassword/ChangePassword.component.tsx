import { PrimaryButton, TextField } from '@generatedata/core';
import Alert from '@mui/material/Alert';
import { useRef, useState } from 'react';

export type ChangePasswordProps = {
  oneTimePassword: string;
  onSave: (currentPassword: string, newPassword: string, onSuccess: () => void, onError: () => void) => void;
  className: string;
  i18n: any;
  throttle?: boolean;
};

const ChangePassword = ({ oneTimePassword, onSave, className, i18n, throttle = false }: ChangePasswordProps) => {
  const currentPasswordField = useRef<HTMLInputElement>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const passwordField = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');

  const password2Field = useRef<HTMLInputElement>(null);
  const [password2, setPassword2] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const onSuccess = (): void => {
    setCurrentPassword('');
    setPassword('');
    setPassword2('');
  };
  const onError = (): void => {
    setCurrentPasswordError(i18n.passwordUpdateInvalidPassword);
    currentPasswordField.current!.focus();
  };

  const handleSave = (e: any): void => {
    e.preventDefault();

    if (isValid(true)) {
      // for one-time password logins, just send back the one-time password for confirmation on the server
      const currPassword = oneTimePassword ? oneTimePassword : currentPassword;
      onSave(currPassword, password, onSuccess, onError);
    }
  };

  // TODO move validation errors to RIGHT of field, and making them show up immediately would be nice
  const isValid = (showErrors = false): boolean => {
    let hasError = false;
    if (!oneTimePassword && currentPassword.trim() === '') {
      hasError = true;
    }

    if (password.trim() === '') {
      hasError = true;
    } else if (password2.trim() === '') {
      hasError = true;
    } else if (password !== password2) {
      if (showErrors) {
        setPassword2Error(i18n.validationDifferentNewPasswords);
        password2Field.current!.focus();
        hasError = true;
      }
    }

    return !hasError;
  };

  const submitButtonEnabled = isValid();

  const getCurrentPasswordBlock = () => {
    if (oneTimePassword) {
      return (
        <Alert severity="warning" style={{ marginBottom: 15 }}>
          {i18n.oneTimePasswordLogin}
        </Alert>
      );
    }

    return (
      <>
        <label htmlFor="currentPassword">{i18n.currentPassword}</label>
        <div
          style={{
            marginBottom: 15,
            paddingBottom: 20,
            borderBottom: '1px solid #dddddd'
          }}
        >
          <TextField
            type="password"
            error={currentPasswordError}
            ref={currentPasswordField}
            value={currentPassword}
            id="currentPassword"
            name="currentPassword"
            onChange={(e: any): void => {
              setCurrentPasswordError('');
              setCurrentPassword(e.target.value);
            }}
            style={{ width: 220 }}
            tooltipPlacement="right"
            throttle={throttle}
            autoFocus
          />
        </div>
      </>
    );
  };

  return (
    <form onSubmit={handleSave} autoComplete="off" className={className}>
      <div style={{ marginBottom: 10 }}>
        {getCurrentPasswordBlock()}

        <label htmlFor="password">{i18n.password}</label>
        <div style={{ marginBottom: 15 }}>
          <TextField
            type="password"
            ref={passwordField}
            value={password}
            id="password"
            name="password"
            onChange={(e: any): void => setPassword(e.target.value)}
            style={{ width: 220 }}
            tooltipPlacement="right"
            autoFocus={oneTimePassword !== ''}
            throttle={throttle}
          />
        </div>

        <label htmlFor="password2">{i18n.reenterPassword}</label>
        <div style={{ marginBottom: 15 }}>
          <TextField
            type="password"
            ref={password2Field}
            value={password2}
            error={password2Error}
            id="password2"
            name="password2"
            onChange={(e: any): void => {
              setPassword2Error('');
              setPassword2(e.target.value);
            }}
            autoComplete="off"
            style={{ width: 220 }}
            tooltipPlacement="right"
            throttle={throttle}
          />
        </div>
      </div>

      <div>
        <PrimaryButton type="submit" disabled={!submitButtonEnabled}>
          {i18n.update}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default ChangePassword;

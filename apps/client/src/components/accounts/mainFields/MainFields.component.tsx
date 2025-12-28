import { Dropdown, PrimaryButton, TextField, useSharedClasses } from '@generatedata/core';
import { canadianProvinceOptions, countryDropdownOptions } from '@generatedata/plugins';
import { isValidEmail } from '@generatedata/utils/general';
import { generateRandomAlphanumericStr } from '@generatedata/utils/random';
import Refresh from '@mui/icons-material/Refresh';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import { useRef, useState } from 'react';
import { AccountEditingData } from '~store/account/account.reducer';

export type MainFieldsProps = {
  data: AccountEditingData;
  accountHasChanges: boolean;
  updateAccount: (data: AccountEditingData) => void;
  submitButtonLabel: string;
  i18n: any;
  onSave: (setOneTimePassword: boolean) => void;
  onCancel: () => void;
  showRequiredFieldError: boolean;
  isAddingUser: boolean;
  className?: string;
};

const MainFields = ({
  data,
  accountHasChanges,
  updateAccount,
  onSave,
  onCancel,
  submitButtonLabel,
  i18n,
  showRequiredFieldError,
  isAddingUser,
  className = ''
}: MainFieldsProps) => {
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const [oneTimePasswordFieldVisible, setOneTimePasswordFieldVisible] = useState(false);
  const sharedClasses = useSharedClasses();

  // very fussy indeed!
  const [emailFieldHasFocus, setEmailFieldHasFocus] = useState(false);
  const [emailFieldHasHadFocus, setEmailFieldHasHadFocus] = useState(false);

  const onBlurEmail = (): void => {
    setEmailFieldHasFocus(false);
    setEmailFieldHasHadFocus(true);
  };

  const update = (fieldName: string, value: string): void => {
    updateAccount({
      ...data,
      [fieldName]: value
    });
  };

  let fieldsValid = true;
  if (!data.firstName.trim() || !data.lastName.trim() || !data.email.trim()) {
    if (showRequiredFieldError) {
      fieldsValid = false;
    }
  }
  let emailError;
  if (data.email.trim() === '') {
    if (showRequiredFieldError) {
      emailError = i18n.requiredField;
    }
  } else if (!isValidEmail(data.email)) {
    // subtle. We only want to show the email field is in an invalid state when
    // (a) adding an email and the user's moved off the field & left it in an invalid state
    // (b) is editing the email
    if (!isAddingUser || (emailFieldHasHadFocus && !emailFieldHasFocus)) {
      emailError = i18n.validationInvalidEmail;
      fieldsValid = false;
    }
  }
  let oneTimePasswordError;
  if (isAddingUser && data.oneTimePassword?.trim() === '') {
    oneTimePasswordError = i18n.requiredField;
  }

  const saveButtonEnabled = accountHasChanges && fieldsValid;

  const getCanadianRegions = () => {
    if (data.country !== 'CA') {
      return null;
    }

    return (
      <>
        <label>{i18n.province}</label>
        <div style={{ marginBottom: 15 }}>
          <Dropdown value={data.region} onChange={(item: any): any => update('region', item.value)} options={canadianProvinceOptions} />
        </div>
      </>
    );
  };

  const handleSave = (e: any): void => {
    e.preventDefault();

    if (!fieldsValid) {
      return;
    }

    onSave(isAddingUser && oneTimePasswordFieldVisible);
  };

  const generatePassword = () => {
    const pwd = generateRandomAlphanumericStr('CcEVvFLlDXxH');
    update('oneTimePassword', pwd);
  };

  const firstNameError = showRequiredFieldError && data.firstName.trim() === '' ? i18n.requiredField : '';
  const lastNameError = showRequiredFieldError && data.lastName.trim() === '' ? i18n.requiredField : '';

  let cancelLinkClasses = sharedClasses.cancelLink;
  if (!saveButtonEnabled) {
    cancelLinkClasses += ` ${sharedClasses.hidden}`;
  }

  return (
    <form onSubmit={handleSave} autoComplete="off" className={className}>
      <div>
        <label>{i18n.firstName}</label>
        <div style={{ marginBottom: 15 }}>
          <TextField
            error={firstNameError}
            value={data.firstName}
            name="firstName"
            onChange={(e: any): void => update('firstName', e.target.value)}
            style={{ width: '100%' }}
            autoFocus
          />
        </div>

        <label>{i18n.lastName}</label>
        <div style={{ marginBottom: 15 }}>
          <TextField
            error={lastNameError}
            value={data.lastName}
            name="lastName"
            onChange={(e: any): void => update('lastName', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <label>{i18n.email}</label>
        <div style={{ marginBottom: 15 }}>
          <TextField
            error={emailError}
            value={data.email}
            name="email"
            onChange={(e: any): void => update('email', e.target.value)}
            onFocus={(): void => setEmailFieldHasFocus(true)}
            onBlur={onBlurEmail}
            style={{ width: '100%' }}
            ref={emailFieldRef}
          />
        </div>

        <label>{i18n.country}</label>
        <div style={{ marginBottom: 15 }}>
          <Dropdown value={data.country} onChange={(item: any): any => update('country', item.value)} options={countryDropdownOptions} />
        </div>

        {getCanadianRegions()}

        {isAddingUser && (
          <div style={{ marginTop: -10, marginBottom: 15 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={oneTimePasswordFieldVisible}
                    color="primary"
                    onClick={() => setOneTimePasswordFieldVisible(!oneTimePasswordFieldVisible)}
                  />
                }
                label="Set one-time password"
              />
            </FormGroup>
            {oneTimePasswordFieldVisible && (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <TextField
                    error={oneTimePasswordError}
                    value={data.oneTimePassword || ''}
                    name="oneTimePassword"
                    onChange={(e: any): void => update('oneTimePassword', e.target.value)}
                    style={{ width: '100%', marginRight: 8 }}
                  />
                  <IconButton size="small" onClick={generatePassword}>
                    <Refresh />
                  </IconButton>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div>
        <PrimaryButton type="submit" disabled={!saveButtonEnabled}>
          {submitButtonLabel}
        </PrimaryButton>

        <span onClick={onCancel} className={cancelLinkClasses}>
          {i18n.cancel}
        </span>
      </div>
    </form>
  );
};

export default MainFields;

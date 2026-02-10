jest.mock('./hooks/useChangePasswordContainer');

import { render, fireEvent } from '@testing-library/react';
import { ChangePassword } from './ChangePassword.component';
import { getTestI18n } from '../../../../tests/testHelpers';
import { useChangePasswordContainer } from './hooks/useChangePasswordContainer';

const i18n = getTestI18n();

describe('ChangePassword container', () => {
  it('submitting form does not work when fields empty', () => {
    const onSave = jest.fn();
    (useChangePasswordContainer as jest.Mock).mockReturnValue({
      oneTimePassword: '',
      i18n,
      onSave
    });

    const { container } = render(<ChangePassword className="the-class" throttle={false} />);

    const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(onSave).not.toHaveBeenCalled();
  });

  it('submitting form still does not works when fields non-empty but new passwords are not identical', () => {
    const onSave = jest.fn();
    (useChangePasswordContainer as jest.Mock).mockReturnValue({
      oneTimePassword: '',
      i18n,
      onSave
    });
    const { container } = render(<ChangePassword className="the-class" throttle={false} />);

    const currentPasswordField = container.querySelector('input[name=currentPassword]') as HTMLInputElement;
    fireEvent.change(currentPasswordField, {
      target: {
        value: 'current-password'
      }
    });

    const newPasswordField1 = container.querySelector('input[name=password]') as HTMLInputElement;
    fireEvent.change(newPasswordField1, {
      target: {
        value: 'password'
      }
    });

    const newPasswordField2 = container.querySelector('input[name=password2]') as HTMLInputElement;
    fireEvent.change(newPasswordField2, {
      target: {
        value: 'passwordX'
      }
    });

    const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(onSave).not.toHaveBeenCalled();
  });

  it('submitting form works when fields non-empty and new passwords are identical', () => {
    const onSave = jest.fn();
    (useChangePasswordContainer as jest.Mock).mockReturnValue({
      oneTimePassword: '',
      i18n,
      onSave
    });
    const { container } = render(<ChangePassword className="the-class" throttle={false} />);

    const currentPasswordField = container.querySelector('input[name=currentPassword]') as HTMLInputElement;
    fireEvent.change(currentPasswordField, {
      target: {
        value: 'current-password'
      }
    });

    const newPasswordField1 = container.querySelector('input[name=password]') as HTMLInputElement;
    fireEvent.change(newPasswordField1, {
      target: {
        value: 'password'
      }
    });

    const newPasswordField2 = container.querySelector('input[name=password2]') as HTMLInputElement;
    fireEvent.change(newPasswordField2, {
      target: {
        value: 'password'
      }
    });

    const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(onSave).toHaveBeenCalled();
  });
});

// describe('ChangePassword (mocked hook)', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('submitting form does not work when fields empty', () => {
//     const onSave = jest.fn();
//     (useChangePasswordContainer as jest.Mock).mockReturnValue({
//       oneTimePassword: '',
//       i18n,
//       onSave
//     });
//     const { container } = render(<ChangePassword className="the-class" throttle={false} />);
//     const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
//     fireEvent.click(submitButton);
//     expect(onSave).not.toHaveBeenCalled();
//   });

//   it('submitting form does not work when new passwords are not identical', () => {
//     const onSave = jest.fn();
//     (useChangePasswordContainer as jest.Mock).mockReturnValue({
//       oneTimePassword: '',
//       i18n,
//       onSave
//     });
//     const { container } = render(<ChangePassword className="the-class" throttle={false} />);
//     const currentPasswordField = container.querySelector('input[name=currentPassword]') as HTMLInputElement;
//     fireEvent.change(currentPasswordField, { target: { value: 'current-password' } });
//     const newPasswordField1 = container.querySelector('input[name=password]') as HTMLInputElement;
//     fireEvent.change(newPasswordField1, { target: { value: 'password' } });
//     const newPasswordField2 = container.querySelector('input[name=password2]') as HTMLInputElement;
//     fireEvent.change(newPasswordField2, { target: { value: 'passwordX' } });
//     const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
//     fireEvent.click(submitButton);
//     expect(onSave).not.toHaveBeenCalled();
//   });

//   it('submitting form works when fields non-empty and new passwords are identical', () => {
//     const onSave = jest.fn();
//     (useChangePasswordContainer as jest.Mock).mockReturnValue({
//       oneTimePassword: '',
//       i18n,
//       onSave
//     });
//     const { container } = render(<ChangePassword className="the-class" throttle={false} />);
//     const currentPasswordField = container.querySelector('input[name=currentPassword]') as HTMLInputElement;
//     fireEvent.change(currentPasswordField, { target: { value: 'current-password' } });
//     const newPasswordField1 = container.querySelector('input[name=password]') as HTMLInputElement;
//     fireEvent.change(newPasswordField1, { target: { value: 'password' } });
//     const newPasswordField2 = container.querySelector('input[name=password2]') as HTMLInputElement;
//     fireEvent.change(newPasswordField2, { target: { value: 'password' } });
//     const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
//     fireEvent.click(submitButton);
//     expect(onSave).toHaveBeenCalled();
//   });
// });

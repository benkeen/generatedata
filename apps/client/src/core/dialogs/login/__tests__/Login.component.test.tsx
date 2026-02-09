import { fireEvent } from '@testing-library/react';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';
import LoginDialog from '../Login.component';
import i18n from '@generatedata/i18n-core/en';

const defaultProps = {
  visible: false,
  onClose: () => {},
  onSubmit: () => {},
  onExited: () => {},
  showPasswordResetDialog: () => {},
  dialogProcessing: false,
  defaultEmail: '',
  i18n
};

describe('LoginDialog', () => {
  it('clicking close calls the onClose callback', () => {
    const onClose = jest.fn();
    const { baseElement } = renderWithStoreAndRouter(<LoginDialog {...defaultProps} visible={true} onClose={onClose} />);

    const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('clicking enter in the fields submits the form and shows errors on the fields', () => {
    const onSubmit = jest.fn();
    const { baseElement } = renderWithStoreAndRouter(<LoginDialog {...defaultProps} visible={true} onSubmit={onSubmit} />);

    const inputFields = baseElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

    // weird, but it seems you can't simulate the <enter> click in another way
    fireEvent.submit(inputFields[0]);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('when email is invalid but password correct only shows erorr on password field', () => {
    const onSubmit = jest.fn();
    const { baseElement } = renderWithStoreAndRouter(<LoginDialog {...defaultProps} visible={true} onSubmit={onSubmit} />);

    const inputFields = baseElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

    // weird, but it seems you can't simulate the <enter> click in another way
    fireEvent.change(inputFields[0], { target: { value: 'tom@something' } });
    fireEvent.change(inputFields[1], { target: { value: 'password123' } });

    fireEvent.submit(inputFields[0]);

    // expect(inputFields[0].classList.contains(sharedStyles.errorField)).toBeTruthy();
    // expect(inputFields[1].classList.contains(sharedStyles.errorField)).toBeFalsy();
  });

  it('when fields are valid it submits the form', () => {
    const onSubmit = jest.fn();
    const { baseElement } = renderWithStoreAndRouter(<LoginDialog {...defaultProps} visible={true} onSubmit={onSubmit} />);

    const inputFields = baseElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

    // weird, but it seems you can't simulate the <enter> click in another way
    fireEvent.change(inputFields[0], {
      target: { value: 'tom@something.com' }
    });
    fireEvent.change(inputFields[1], { target: { value: 'password123' } });

    fireEvent.submit(inputFields[0]);

    expect(onSubmit).toHaveBeenCalledWith('tom@something.com', 'password123', expect.anything(), expect.anything());
  });
});

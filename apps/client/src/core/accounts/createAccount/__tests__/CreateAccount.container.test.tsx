import CreateAccount from '../CreateAccount.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('YourAccount container', () => {
  it('renders', () => {
    const { baseElement } = renderWithStoreAndRouter(<CreateAccount />);

    expect(baseElement.querySelector('div')).toBeTruthy();
  });
});

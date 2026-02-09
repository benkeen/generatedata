import AccountContainer from '../Account.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('Account Container', () => {
  it('renders', () => {
    const { baseElement } = renderWithStoreAndRouter(<AccountContainer />);

    expect(baseElement.querySelector('div')).toBeTruthy();
  });
});

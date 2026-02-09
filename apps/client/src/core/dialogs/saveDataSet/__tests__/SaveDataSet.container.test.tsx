import SaveDataSet from '../SaveDataSet.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('SaveDataSet Container', () => {
  it('renders', () => {
    const { baseElement } = renderWithStoreAndRouter(<SaveDataSet />);

    expect(baseElement.querySelector('div')).toBeTruthy();
  });
});

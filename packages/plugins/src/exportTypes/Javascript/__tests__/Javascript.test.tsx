import { render } from '@testing-library/react';
import { defaultETSettings } from '../../../tests/testHelpers';
import { Settings } from '../Javascript';
import { initialState } from '../Javascript.state';

import i18n from '@generatedata/i18n';

describe('Settings', () => {
  it('renders', () => {
    const data = { ...initialState };
    const onUpdate = jest.fn();

    const { container } = render(<Settings {...defaultETSettings} i18n={i18n} data={data} onUpdate={onUpdate} />);
    expect(container).toBeTruthy();
  });
});

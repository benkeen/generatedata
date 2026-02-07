import * as langUtils from '@generatedata/utils/lang';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import { defaultETSettings } from '../../../tests/testHelpers';
import { Settings } from '../CSV';
import { initialState } from '../CSV.state';

import i18n from '../i18n/en.json';

describe('Settings', () => {
  it('renders', () => {
    const data = { ...initialState };
    const onUpdate = jest.fn();

    sinon.stub(langUtils, 'getStrings').returns({
      core: i18n,
      dataTypes: {}
    });

    const { container } = render(<Settings {...defaultETSettings} i18n={i18n} data={data} onUpdate={onUpdate} />);
    expect(container).toBeTruthy();
  });
});

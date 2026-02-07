import i18n from '../i18n/en.json';
import { render } from '@testing-library/react';
import { Options } from '../NormalDistribution';

const optionsProps = {
  coreI18n: {},
  countryI18n: {},
  i18n,
  id: 'id',
  gridPanelDimensions: { width: 100, height: 100 },
  isCountryNamesLoaded: false,
  isCountryNamesLoading: false,
  countryNamesMap: null
};

describe('Options', () => {
  it('renders', () => {
    const { container } = render(<Options {...optionsProps} data={{}} onUpdate={() => {}} />);
    expect(container).toBeTruthy();
  });
});

import i18n from '../i18n/en.json';
import { render } from '@testing-library/react';
import { Help } from '../SIRET';

const defaultProps = {
  coreI18n: {},
  countryI18n: {},
  i18n
};

describe('Help', () => {
  it('renders', () => {
    const { container } = render(<Help {...defaultProps} />);
    expect(container).toBeTruthy();
  });
});

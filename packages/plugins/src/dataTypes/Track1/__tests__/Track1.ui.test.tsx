import i18n from '@generatedata/i18n';
import { render } from '@testing-library/react';
import { Help } from '../Track1';

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

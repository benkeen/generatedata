import i18n from '@generatedata/i18n';
import { render } from '@testing-library/react';
import { Help } from '../Colour';

const defaultProps = {
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	dimensions: { width: 100, height: 100 }
};

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps}/>);
		expect(container).toBeTruthy();
	});
});

import i18n from '@generatedata/i18n';
import { render } from '@testing-library/react';
import { Help, Options } from '../OrganizationNumber';

const defaultProps = {
	coreI18n: {},
	countryI18n: {},
	i18n
};

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

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps}/>);
		expect(container).toBeTruthy();
	});
});

describe('Options', () => {
	it('renders', () => {
		const { container } = render(
			<Options
				{...optionsProps}
				data={{}}
				onUpdate={() => {}}
			/>
		);
		expect(container).toBeTruthy();
	});
});

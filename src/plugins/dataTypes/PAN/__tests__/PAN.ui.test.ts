import { getCreditCardOptions } from '../PAN.ui';

describe('getCreditCardOptions', () => {
	it('returns data in the expected format', () => {
		const i18n = {
			one: 'First one',
			two: 'Second one',
			three: 'Third one'
		};
		expect(getCreditCardOptions(['one', 'two', 'three'], i18n)).toEqual([
			{ value: 'one', label: 'First one' },
			{ value: 'two', label: 'Second one' },
			{ value: 'three', label: 'Third one' }
		]);
	});
});

import { getRoutes, removeLocale } from '../routeUtils';

describe('getRoutes', () => {
	it('returns all available routes by default with the generator page the last one with the root path', () => {
		const defaultPaths = [
			'/account',
			'/accounts',
			'/login',
			'/datasets',
			'/register',
			'/'
		];

		const foundPaths = getRoutes().map(({ path }) => path);
		expect(foundPaths).toEqual(defaultPaths);
	});
});

describe('removeLocale', () => {
	it('removes nothing for root', () => {
		expect(removeLocale('/')).toEqual('/');
		expect(removeLocale('')).toEqual('');
	});

	it('removes nothing for non-locale path', () => {
		expect(removeLocale('/accounts')).toEqual('/accounts');
		expect(removeLocale('/blah/de/blah')).toEqual('/blah/de/blah');
	});

	it('removes valid locales from root', () => {
		expect(removeLocale('/de')).toEqual('');
		expect(removeLocale('/en')).toEqual('');
		expect(removeLocale('/zz')).toEqual('/zz');
	});

	it('removes valid locales from full path', () => {
		expect(removeLocale('/de/accounts')).toEqual('/accounts');
		expect(removeLocale('/ta/accounts/')).toEqual('/accounts/');
		expect(removeLocale('/zz/accounts')).toEqual('/zz/accounts');
	});
});

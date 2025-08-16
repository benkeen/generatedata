import { getI18nString, getCurrentLocalizedPath } from '../langUtils';

describe('getI18nString', () => {
	it('bounds checking', () =>{
		expect(getI18nString('test', [])).toEqual('test');
		expect(getI18nString('test', ['whatever'])).toEqual('test');
		expect(getI18nString('', [])).toEqual('');
	});

	it('replaces as expected', () => {
		expect(getI18nString('Hello %1', ['world'])).toEqual('Hello world');
		expect(getI18nString('Double %1 %1 test', ['tap'])).toEqual('Double tap tap test');
		expect(getI18nString('Nonexistent placeholder %1 test', [])).toEqual('Nonexistent placeholder %1 test');
		expect(getI18nString('Multiple %1 %2', ['placeholder', 'test'])).toEqual('Multiple placeholder test');
	});
});

describe('getCurrentLocalizedPath', () => {
	const { location } = window;

	beforeAll(() => {
		// @ts-ignore
		delete window.location;
	});

	afterAll(() => {
		window.location = location;
	});

	it('gets expected localized path from blank English path', () => {
		// @ts-ignore-line
		window.location = { pathname: '' };

		expect(getCurrentLocalizedPath('fr')).toEqual('/fr');
	});

	it('gets expected localized path from blank English path with trailing slash', () => {
		// @ts-ignore-line
		window.location = { pathname: '/' };

		expect(getCurrentLocalizedPath('fr')).toEqual('/fr');
	});

	it('appends locale to existing path (single folder)', () => {
		// @ts-ignore-line
		window.location = { pathname: '/accounts' };

		expect(getCurrentLocalizedPath('de')).toEqual('/de/accounts');
	});

	it('appends locale to existing path (single folder) with trailing slash', () => {
		// @ts-ignore-line
		window.location = { pathname: '/accounts/' };

		expect(getCurrentLocalizedPath('de')).toEqual('/de/accounts');
	});

	it('appends locale to existing path (multiple folders)', () => {
		// @ts-ignore-line
		window.location = { pathname: '/accounts/subpagehere' };

		expect(getCurrentLocalizedPath('de')).toEqual('/de/accounts/subpagehere');
	});

	it('appends locale to existing path (single folder) with trailing slash', () => {
		// @ts-ignore-line
		window.location = { pathname: '/accounts/subpagehere/' };

		expect(getCurrentLocalizedPath('de')).toEqual('/de/accounts/subpagehere');
	});

	it('invalid localization strings just returns the original path', () => {
		// @ts-ignore-line
		window.location = { pathname: '/accounts' };

		expect(getCurrentLocalizedPath('zz' as any)).toEqual('/accounts');
	});

	it('English does not change an existing english path', () => {
		// @ts-ignore-line
		window.location = { pathname: '/accounts' };

		expect(getCurrentLocalizedPath('en')).toEqual('/accounts');
	});

	it('English removes an existing non-English path', () => {
		// @ts-ignore-line
		window.location = { pathname: '/fr/accounts' };

		expect(getCurrentLocalizedPath('en')).toEqual('/accounts');
	});
});

import { getRoutes } from '../routeUtils';

describe('getRoutes', () => {
	it('returns all available routes by default with the generator page the last one with the root path', () => {
		const defaultPaths = [
			'/account',
			'/accounts',
			'/login',
			'/datasets',
			'/'
		];

		const foundPaths = getRoutes().map(({ path }) => path);
		expect(foundPaths).toEqual(defaultPaths);
	});
});

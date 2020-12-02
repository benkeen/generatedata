import Generator from '~core/generator/Generator.container';
import AccountPage from '~core/account/Account.container';
import DataSetsPage from '~core/account/dataSets/DataSets.container';
import { GDHeaderLink, GDRoute } from '~types/general';
import { AccountType } from '~types/account';

let customRoutes: GDRoute[] = [];
export const registerCustomRoutes = (routes: GDRoute[]): void => {
	customRoutes = routes;
};

// called on boot-up. Returns the list of available react-router routes plus the components they should link to. This
// allows external customization via the `registerCustomRoutes` method above
export const getRoutes = (): GDRoute[] => {
	const routes: GDRoute[] = [
		{ path: '/account', component: AccountPage },
		{ path: '/login', component: () => {} }, // LoginPage
		{ path: '/datasets', component: DataSetsPage }
	];

	// react-router is a bit fussy about the order of routes; the root one has to come last. Since that is configurable
	// (prod root = a splash intro page; local is the generator) we have to do a little work here to get them in the
	// right order
	const nonRootRoutes = customRoutes.filter((route) => route.path !== '/');
	if (nonRootRoutes.length) {
		routes.concat(nonRootRoutes);
	}

	routes.push({ path: process.env.GD_GENERATOR_PATH || '/', component: Generator });
	const rootRoutes = customRoutes.filter((route) => route.path === '/');

	if (rootRoutes.length) {
		routes.concat(rootRoutes);
	}

	return routes;
};

export interface CustomHeaderLinkGetter {
	(isLoggedIn: boolean, accountType: AccountType): GDHeaderLink[];
}

let customHeaderLinkGetter: CustomHeaderLinkGetter;

// allows external code to override the header links
export const registerCustomHeaderLinksGetter = (getter: CustomHeaderLinkGetter): void => {
	customHeaderLinkGetter = getter;
};

export const getHeaderLinks = (isLoggedIn: boolean, accountType: AccountType): GDHeaderLink[] => {
	const appType = process.env.GD_APP_TYPE;

	if (customHeaderLinkGetter) {
		return customHeaderLinkGetter(isLoggedIn, accountType);
	}

	let links: GDHeaderLink[] = [];
	switch (appType) {
		case 'login':
			if (isLoggedIn) {
				links = ['generator', 'dataSets', 'separator', 'userAccount', 'logout'];
			} else {
				links = ['generator', 'separator', 'loginDialog'];
			}
			break;

		case 'single':
			links = ['generator', 'separator', 'userAccount'];
			break;

		case 'open':
			if (isLoggedIn) {
				links = ['generator', 'separator', 'dataSets', 'userAccount', 'logout'];
			} else {
				links = ['generator', 'signup', 'separator', 'loginDialog', 'logout'];
			}
			break;

		case 'closed':
			if (isLoggedIn) {
				links = ['generator', 'separator', 'dataSets', 'userAccount', 'logout'];
			} else {
				links = ['loginPage'];
			}
			break;
	}

	return links;
};

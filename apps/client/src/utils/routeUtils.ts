import Generator from '~core/generator/Generator.container';
import AccountPage from '~core/account/Account.container';
import DataSetsPage from '~core/account/dataSets/DataSets.container';
import LoginPage from '~core/auth/loginPage/LoginPage.container';
import AccountsPage from '~core/accounts/Accounts.container';
import { GDHeaderLink, GDLocale, GDRoute } from '~types/general';
import { AccountType } from '~types/account';
import { PAGE_CHANGE } from '~store/main/main.actions';
import { trimChars } from '@generatedata/utils/dist/string';
import clientConfig from '@generatedata/config/dist/client.config';
import C from '@generatedata/config/dist/constants';

// TODO move this under `extensionUtils`
let customRoutes: GDRoute[] = [];
export const registerCustomRoutes = (routes: GDRoute[]): void => {
	customRoutes = routes;
};

// called on boot-up. Returns the list of available react-router routes plus the components they should link to. This
// allows external customization via the `registerCustomRoutes` method above
export const getRoutes = (): GDRoute[] => {
	let routes: GDRoute[] = [
		{ path: '/account', component: AccountPage },
		{ path: '/accounts', component: AccountsPage },
		{ path: '/login', component: LoginPage },
		{ path: '/datasets', component: DataSetsPage },
		{ path: '/register', component: DataSetsPage }
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

	// lastly, add or overwrite any existing routes (e.g. register) with the custom routes
	customRoutes.forEach(({ path, component }: GDRoute) => {
		let found = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].path === path) {
				routes[i].component = component;
				found = true;
			}
		}
		if (!found) {
			routes.push({ path, component });
		}
	});

	if (rootRoutes.length) {
		routes = routes.concat(rootRoutes);
	}

	return routes;
};

export const getUnlocalizedGeneratorRoute = (): string => clientConfig.appSettings.GD_GENERATOR_PATH || '';

export const getGeneratorPageRoute = (locale: GDLocale): string => {
	let path = getUnlocalizedGeneratorRoute();
	if (locale !== 'en') {
		path = `/${locale}${path}`;
	}

	return path;
};

// helper method to return a boolean if the user is on the generator page, regardless of locale
export const isGeneratorPage = (currentPage: string, locale: GDLocale) => {
	const generatorRoute = getGeneratorPageRoute(locale);

	// do a comparison that ignores trailing slashes. Issue #795
	return trimChars(currentPage, '/') === trimChars(generatorRoute, '/');
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
	const appType = clientConfig.appSettings.GD_APP_TYPE;

	if (customHeaderLinkGetter) {
		return customHeaderLinkGetter(isLoggedIn, accountType);
	}

	let links: GDHeaderLink[] = [];
	switch (appType) {
		// login - allows anonymous access but without logging in they can't save their data sets or generate more than
		// GD_MAX_DEMO_MODE_ROWS at a time. Only the admin account can create new accounts
		case C.APP_TYPES.LOGIN:
			if (isLoggedIn) {
				links = ['generator'];
				if (accountType === 'admin' || accountType === 'superuser') {
					links.push('accounts');
				}
				links = links.concat(['separator', 'userAccount', 'logout']);
			} else {
				links = ['generator', 'separator', 'loginDialog'];
			}
			break;

		// single - there's only ever a single account and that user is logged in by default
		case C.APP_TYPES.SINGLE:
			links = ['generator', 'separator', 'userAccount'];
			break;

		// open - anyone that has access to the URL can use the application anonymously or create an account
		case C.APP_TYPES.OPEN:
			if (isLoggedIn) {
				links = ['generator', 'separator', 'userAccount', 'logout'];
			} else {
				links = ['generator', 'register', 'separator', 'loginDialog', 'logout'];
			}
			break;

		// closed - no-one can access the script without logging in first
		case C.APP_TYPES.CLOSED:
			if (isLoggedIn) {
				links = ['generator', 'separator', 'userAccount', 'logout'];
			} else {
				links = ['loginPage'];
			}
			break;
	}

	return links;
};

export const updateBodyClass = (store: any, pathname: string): void => {
	let pageId = pathname.replace(/\//g, '');

	const rootLocale = clientConfig.appSettings.GD_LOCALES.indexOf(pageId as GDLocale);
	if (pageId === '' || rootLocale !== -1) {
		pageId = process.env.GD_GENERATOR_PATH === '/generator' ? 'home' : 'generator';
	}

	// bit aggressive, but we're not appending any other body classes right now so this is fine. Also, this'll now
	// include sub-pages since we're removing all the slashes
	document.body.className = `page-${pageId}`;

	store.dispatch({
		type: PAGE_CHANGE,
		payload: {
			page: location.pathname
		}
	});
};

export const removeLocale = (path: string): string => {
	const regexStr = `^/?(${clientConfig.appSettings.GD_LOCALES.join('|')})`;
	const regex = new RegExp(regexStr);
	return path.replace(regex, '');
};

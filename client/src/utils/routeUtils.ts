import Generator from '../core/generator/Generator.container';
import AccountPage from '../core/account/Account.container';
import DataSetsPage from '../core/account/dataSets/DataSets.container';
import { GDHeaderLink, GDRoute } from '~types/general';

// called on boot-up. Returns the list of available react-router route info for this installation
export const getRoutes = (): GDRoute[] => {
	const routes: GDRoute[] = [
		{ path: '/account', component: AccountPage },
		{ path: '/datasets', component: DataSetsPage }
	];

	if (process.env.GD_APP_TYPE !== 'prod') {
		routes.push({ path: '/', component: Generator });
	}

	return routes;
};

export interface CustomHeaderLinkGetter {
	(isLoggedIn: boolean): GDHeaderLink[];
}

let customHeaderLinkGetter: CustomHeaderLinkGetter;

// allows external code to override the header links
export const registerCustomHeaderLinksGetter: any = (getter: CustomHeaderLinkGetter) => customHeaderLinkGetter = getter;

export const getHeaderLinks = (isLoggedIn: boolean): GDHeaderLink[] => {
	const appType = process.env.GD_APP_TYPE;

	if (customHeaderLinkGetter) {
		return customHeaderLinkGetter(isLoggedIn);
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

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

let customHeaderLinks: GDHeaderLink[] = [];

export const setCustomHeaderLinks = (links: GDHeaderLink[]) => customHeaderLinks = links;

export const getHeaderLinks = (isLoggedIn: boolean): GDHeaderLink[] => {
	const appType = process.env.GD_APP_TYPE;

	if (customHeaderLinks.length) {
		return customHeaderLinks;
	}

	let links: GDHeaderLink[] = [];
	switch (appType) {
		case 'login':
			if (isLoggedIn) {
				links = ['generator', 'separator', 'dataSets', 'userAccount', 'logout'];
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
				links = ['generator', 'signup',  'separator', 'loginDialog', 'logout'];
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

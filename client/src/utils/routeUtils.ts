import Generator from '../core/generator/Generator.container';
import AccountPage from '../core/account/Account.container';
import DataSetsPage from '../core/account/dataSets/DataSets.container';

type GDRoute = {
	path: string;
	component: any;
}

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

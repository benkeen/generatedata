/* istanbul ignore file */
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import * as codemirror from 'codemirror';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';
import { apolloClient } from '~core/apolloClient';
import store, { persistor } from '~core/store';
import Page from '~core/page/Page.container';
import * as core from '~core/index';
import ErrorBoundary from '~core/errorBoundary';
import theme from '~core/theme';
import Toast from '~components/toast/Toast.component';
import C from '~core/constants';
import { getAppStateVersion } from '~store/main/main.selectors';
import { resetStore, initRouteListener } from '~store/main/main.actions';
import { getRoutes } from '~utils/routeUtils';
import '~store/generator/generator.reducer';
import './styles/global.scss';

window.CodeMirror = codemirror;

const checkState = async (state: any): Promise<any> => {
	const lastAppStateVersion = getAppStateVersion(state.getState());
	if (lastAppStateVersion !== C.APP_STATE_VERSION) {
		await state.dispatch(resetStore());
	}
};

const App = withRouter(({ history }: any) => {
	initRouteListener(history);

	const routes = getRoutes();

	return (
		<ErrorBoundary>
			<Page>
				<Switch>
					{routes.map(({ path, component: Component }, index) => <Route key={index} path={path}><Component /></Route>)}
				</Switch>

				<Toast />
			</Page>
		</ErrorBoundary>
	);
});


const AppWrapper = (): JSX.Element => (
	<Provider store={store}>
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={theme}>
				<PersistGate loading={null} persistor={persistor} onBeforeLift={(): Promise<any> => checkState(store)}>
					{(bootstrapped): JSX.Element => {

						// PersistGate handles repopulating the redux store; core.init() re-initializes everything else we
						// need, including checking auth and loading the appropriate locale file
						if (bootstrapped) {
							core.init();
						}

						return (
							<Router>
								<App />
							</Router>
						);
					}}
				</PersistGate>
			</ThemeProvider>
		</ApolloProvider>
	</Provider>
);

export default AppWrapper;

import * as React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { apolloClient } from './core/apolloClient';
import { ThemeProvider } from '@material-ui/core/styles';

// @ts-ignore-line
import * as codemirror from 'codemirror';
import store, { persistor } from './core/store';
import Page from './core/page/Page.container';
import Builder from './core/builder/Builder.container';
import * as core from './core';
import ErrorBoundary from './core/errorBoundary';
import theme from './core/theme';
import '~store/generator/generator.reducer';
import './styles/global.scss';
import C from './core/constants';
import { getAppStateVersion } from '~store/main/main.selectors';
import { resetStore } from '~store/main/main.actions';

window.CodeMirror = codemirror;

const checkState = async (state: any): Promise<any> => {
	const lastAppStateVersion = getAppStateVersion(state.getState());
	if (lastAppStateVersion !== C.APP_STATE_VERSION) {
		await state.dispatch(resetStore());
	}
};

const App = (): JSX.Element => (
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
								<ErrorBoundary>
									<Page>
										<Switch>
											<Route path="/account">
												<div>Account</div>
											</Route>
											<Route path="/about">
												<div>About</div>
											</Route>
											<Route path="/users">
												<div>Users</div>
											</Route>
											<Route path="/">
												<Builder />
											</Route>
										</Switch>
									</Page>
								</ErrorBoundary>
							</Router>
						);
					}}
				</PersistGate>
			</ThemeProvider>
		</ApolloProvider>
	</Provider>
);

export default App;

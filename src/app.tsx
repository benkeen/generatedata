import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import store, { persistor } from './core/store';
import Page from './core/page/Page.container';
import Builder from './core/builder/Builder.container';
import * as core from './core';
import ErrorBoundary from './core/errorBoundary';
import theme from './core/theme';
import './core/generator/generator.reducer';
import './styles/global.scss';

/*
routes:
	welcome (?)
	tour (?)
	about
	documentation (?)
	news
	donate
 */

const App = (): JSX.Element => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<PersistGate loading={null} persistor={persistor}>
				{(bootstrapped): JSX.Element => {

					// PersistGate handles repopulating the redux store; core.init() re-initializes everything else we
					// need, including loading the appropriate locale file based on whatever locale the user had selected
					if (bootstrapped) {
						core.init();
					}

					return (
						<Router>
							<ErrorBoundary>
								<Page>
									<Switch>
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
	</Provider>
);

export default App;

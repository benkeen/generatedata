import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

// @ts-ignore-line
import * as codemirror from 'codemirror';
import store, { persistor } from './core/store';
import Page from './core/page/Page.container';
import Builder from './core/builder/Builder.container';
import * as core from './core';
import ErrorBoundary from './core/errorBoundary';
import theme from './core/theme';
import './core/store/generator/generator.reducer';
import './styles/global.scss';
import C from './core/constants';
import { getAppStateVersion } from './core/store/main/main.selectors';
import { resetStore } from './core/store/main/main.actions';

window.CodeMirror = codemirror;

const checkState = async (state: any): Promise<any> => {
	const lastAppStateVersion = getAppStateVersion(state.getState());
	if (lastAppStateVersion !== C.APP_STATE_VERSION) {
		await state.dispatch(resetStore());
	}
};

const App = (): JSX.Element => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<PersistGate loading={null} persistor={persistor} onBeforeLift={(): Promise<any> => checkState(store)}>
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

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// tmp. We need at least 1 reducer registered prior to the store instantiation
import './core/init/init.reducer';

import store, { persistor } from './store';
import Page from './components/page/Page.container';
import Grid from './components/grid/Grid.container';
import * as core from './core';

const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			{(bootstrapped) => {

				// PersistGate handles repopulating the redux store, but it takes a little time. Core.init()
				// re-initializes everything else we need, including loading the appropriate locale file based
				// on whatever locale the user had selected
				if (bootstrapped) {
					core.init();
				}

				return (
					<Router>
						<Page>
							<Switch>
								<Route path="/about">
									<div>About</div>
								</Route>
								<Route path="/users">
									<div>Users</div>
								</Route>
								<Route path="/">
									<Grid />
								</Route>
							</Switch>
						</Page>
					</Router>
				);
			}}
		</PersistGate>
	</Provider>
);

export default App;

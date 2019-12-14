import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// tmp. We need at least 1 reducer registered prior to the store instantiation
import './core/init/init.reducer';

import store from './store';
import Page from './components/page/Page.container';
import Grid from './components/grid/Grid.container'
import * as core from './core';

core.init();

const App = () => (
	<Provider store={store}>
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
	</Provider>
);

export default App;

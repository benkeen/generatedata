import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './store';
import Page from './components/page/Page.component';
import Grid from './components/grid/Grid.container'
import core from './core';


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

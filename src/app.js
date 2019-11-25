import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header.component';

const App = () => (
	<Router>
		<div>
			<Header />
			<Switch>
				<Route path="/about">
					<div>About</div>
				</Route>
				<Route path="/users">
					<div>Users</div>
				</Route>
				<Route path="/">
					<div>HOME</div>
				</Route>
			</Switch>
		</div>
	</Router>
);

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './components/page/Page.component';


const App = () => (
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
					<div>HOME</div>
				</Route>
			</Switch>
		</Page>
	</Router>
);

export default App;

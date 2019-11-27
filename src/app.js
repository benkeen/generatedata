import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { actions } from './core/generator';
import store from './store';
import Page from './components/page/Page.component';


// initialization
const init = () => {
	store.dispatch(actions.addRow());
	store.dispatch(actions.addRow());
	store.dispatch(actions.addRow());
	store.dispatch(actions.addRow());
	store.dispatch(actions.addRow());
};

init();


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
						<div>HOME</div>
					</Route>
				</Switch>
			</Page>
		</Router>
	</Provider>
);

export default App;

import thunk from 'redux-thunk';
import reducerRegistry from './reducerRegistry';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const initialState = {};

// preserve initial state for not-yet-loaded reducers
const combine = (reducers) => {
	const reducerNames = Object.keys(reducers);
	Object.keys(initialState).forEach(item => {
		if (reducerNames.indexOf(item) === -1) {
			reducers[item] = (state = null) => state;
		}
	});
	return combineReducers(reducers);
};


function initStore (initialState) {
	let middleware = [thunk];
	let enhancers = [];
	let composeEnhancers = compose;

	if (process.env.NODE_ENV === 'development') {
		const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
		if (typeof composeWithDevToolsExtension === 'function') {
			composeEnhancers = composeWithDevToolsExtension;
		}
	}

	const topLevelReducer = combine(reducerRegistry.getReducers());
	const store = createStore(
		topLevelReducer,
		initialState,
		composeEnhancers(
			applyMiddleware(...middleware),
			...enhancers
		)
	);
	store.asyncReducers = {};

	return store;
}

const store = initStore({});

// allows dynamically changing the redux store
reducerRegistry.setChangeListener((reducers) => store.replaceReducer(combine(reducers)));

export default store;


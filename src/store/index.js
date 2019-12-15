import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducerRegistry from './reducerRegistry';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage';

const initialState = {};

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['init']
};

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

let persistor;
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
	const persistedReducer = persistReducer(persistConfig, topLevelReducer);

	const store = createStore(
		persistedReducer,
		initialState,
		composeEnhancers(
			applyMiddleware(...middleware),
			...enhancers
		)
	);
	store.asyncReducers = {};
	persistor = persistStore(store);

	return store;
}

const store = initStore({});

// allows dynamically changing the redux store as content is loaded async
reducerRegistry.setChangeListener((reducers) => {
	store.replaceReducer(persistReducer(persistConfig, combine(reducers)));
});

export default store;

export { persistor };

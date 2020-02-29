import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import reducerRegistry from './reducerRegistry';

const initialState = {};

// we need at least one reducer when first booting up. This ensures there's something for the store when this 
// file is first imported
export const stubReducer = (state = {}, action = {}) => state;
const initPersistConfig = {
	key: 'stub',
	storage: storage
};
reducerRegistry.register('stub', persistReducer(initPersistConfig, stubReducer));

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['init']
};

// preserve initial state for not-yet-loaded reducers
const combine = (reducers: any): any => {
	const foundReducers = reducers;
	const reducerNames = Object.keys(reducers);
	Object.keys(initialState).forEach((item) => {
		if (reducerNames.indexOf(item) === -1) {
			foundReducers[item] = (state: any = null): any => state;
		}
	});
	return combineReducers(reducers);
};

let persistor: Persistor;
function initStore(state: any): any {
	const middleware = [thunk];
	const enhancers: any = [];
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
		state,
		composeEnhancers(
			applyMiddleware(...middleware),
			...enhancers
		)
	);

	// @ts-ignore-line
	store.asyncReducers = {};
	persistor = persistStore(store);

	return store;
}

// for testing we set up our own mock stores with the subset of whatever we want to examine
let store: any;
if (process.env.NODE_ENV !== 'test') {
	store = initStore({});

	// allows dynamically changing the redux store as content is loaded async
	reducerRegistry.setChangeListener((reducers: any) => {
		store.replaceReducer(persistReducer(persistConfig, combine(reducers)));
	});
}

export default store;

export { persistor };

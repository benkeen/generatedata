import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import reducer from '../core/generator/generator.reducer';

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

	const rootPersistConfig = {
		key: 'root',
		storage: storage,
		blacklist: ['generator']
	};

	const generatorPersistConfig = {
		key: 'generator',
		storage: storage,
		blacklist: [
			'localeFileLoaded',
			'loadedDataTypes',
			'loadedExportTypes'
		]
	};

	const rootReducer = combineReducers({
		generator: persistReducer(generatorPersistConfig, reducer)
	});

	const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

	const store = createStore(
		persistedRootReducer,
		state,
		composeEnhancers(
			applyMiddleware(...middleware),
			...enhancers
		)
	);

	// // @ts-ignore-line
	// store.asyncReducers = {};
	persistor = persistStore(store);

	return store;
}

// for testing we set up our own mock stores with the subset of whatever we want to examine
let store: any;
if (process.env.NODE_ENV !== 'test') {
	store = initStore({});
}

export default store;

export { persistor };

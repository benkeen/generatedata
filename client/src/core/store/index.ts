/* istanbul ignore file */
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import actionsInterceptor from '../actionInterceptor';
import storage from 'redux-persist/lib/storage';
import mainReducer from './main/main.reducer';
import generatorReducer from './generator/generator.reducer';
import packetsReducer from './packets/packets.reducer';
import accountReducer from './account/account.reducer';
import accountsReducer from './accounts/accounts.reducer';

let persistor: Persistor;
function initStore(state: any): any {
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
		storage,
		blacklist: ['generator', 'main', 'packets']
	};

	const generatorPersistConfig = {
		key: 'generator',
		storage,
		blacklist: [
			'initialDependenciesLoaded',
			'loadedDataTypes',
			'loadedExportTypes',
			'isGenerating',
			'numGeneratedRows',
			'dataTypePreviewData'
			// 'currentDataSetId',
			// 'currentDataSetName'
		]
	};

	const mainPersistConfig = {
		key: 'main',
		storage,
		blacklist: [
			'localeFileLoaded',
			'isOnloadAuthDetermined'
		]
	};

	// TODO should be able to just blacklist the entire section and not have to pinpoint them here... doc really not clear
	const packetsPersistConfig = {
		key: 'packets',
		storage,
		blacklist: [
			'currentPacketId',
			'packetIds',
			'packets'
		]
	};

	const rootReducer = combineReducers({
		generator: persistReducer(generatorPersistConfig, generatorReducer),
		main: persistReducer(mainPersistConfig, mainReducer),
		packets: persistReducer(packetsPersistConfig, packetsReducer),
		account: accountReducer,
		accounts: accountsReducer
	});

	const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

	const store = createStore(
		persistedRootReducer,
		state,
		composeEnhancers(
			applyMiddleware(
				thunk,
				actionsInterceptor
			),
			...enhancers
		)
	);
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

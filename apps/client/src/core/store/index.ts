/* istanbul ignore file */
import { persistStore, persistReducer } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import actionsInterceptor from '../actionInterceptor'; // TODO
import storage from 'redux-persist/lib/storage';
import mainReducer from './main/main.reducer';
import generatorReducer from './generator/generator.reducer';
import packetsReducer from './packets/packets.reducer';
import accountReducer from './account/account.reducer';

let persistor: Persistor;
function initStore(state: any): any {
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
			'dataTypePreviewData',
			'bulkActionPending',
			'isCountryNamesLoading',
			'isCountryNamesLoaded'
		]
	};

	const mainPersistConfig = {
		key: 'main',
		storage,
		blacklist: [
			'localeFileLoaded',
			'isOnloadAuthDetermined',
			'tourBundleLoaded',
			'dialogProcessing',
			'accountsCurrentPage',
			'accountsSortCol',
			'accountsSortDir',
			'accountsFilterStr'
		]
	};

	// TODO should be able to just blacklist the entire section and not have to pinpoint them here... doc really not clear
	const packetsPersistConfig = {
		key: 'packets',
		storage,
		blacklist: ['currentPacketId', 'packetIds', 'packets']
	};

	const accountPersistConfig = {
		key: 'account',
		storage,
		blacklist: ['yourAccount', 'editAccount']
	};

	const rootReducer = combineReducers({
		generator: persistReducer(generatorPersistConfig, generatorReducer),
		main: persistReducer(mainPersistConfig, mainReducer),
		packets: persistReducer(packetsPersistConfig, packetsReducer),
		account: persistReducer(accountPersistConfig, accountReducer)
	});

	const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

	const store = configureStore({
		reducer: persistedRootReducer,
		preloadedState: state
		// composeEnhancers(applyMiddleware(thunk, actionsInterceptor), ...enhancers)
	});

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

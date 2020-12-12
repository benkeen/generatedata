import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { getInitialState } from '~store/generator/generator.reducer';
import { initialState as initialMainState } from '~store/main/main.reducer';
import { initialState as initialPacketState } from '~store/packets/packets.reducer';
import { initialState as initialAccountState } from '~store/account/account.reducer';
import { initialState as initialAccountsState } from '~store/accounts/accounts.reducer';
import * as langUtils from '~utils/langUtils';
import { setLocaleFileLoaded } from '~store/main/main.actions';
import generatorReducer from '~store/generator/generator.reducer';
import mainReducer from '~store/main/main.reducer';
import packetsReducer from '~store/packets/packets.reducer';
import accountReducer from '~store/account/account.reducer';
import accountsReducer from '~store/accounts/accounts.reducer';
import thunk from 'redux-thunk';
import actionsInterceptor from '~core/actionInterceptor';

const i18n = require('../src/i18n/en.json');
const jsonI18n = require('../src/plugins/exportTypes/JSON/i18n/en.json');

const rootReducer = combineReducers({
	generator: generatorReducer,
	main: mainReducer,
	packets: packetsReducer,
	account: accountReducer,
	accounts: accountsReducer
});

export const renderWithStoreAndRouter = (
	component: any,
	{
		initialState = getTestState(),
		store = createStore(rootReducer, initialState, compose(
			applyMiddleware(
				thunk,
				actionsInterceptor
			)
		)),
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
	}: any = {}
) => {

	langUtils.setLocale('en', {
		core: i18n,
		dataTypes: {},
		exportTypes: {
			JSON: jsonI18n
		},
		countries: {}
	});
	store.dispatch(setLocaleFileLoaded('en'));

	return {
		...render(
			<Provider store={store}>
				<Router history={history}>{component}</Router>
			</Provider>
		),
		history
	};
};

export const getTestState = () => ({
	generator: getInitialState(),
	main: initialMainState,
	packets: initialPacketState,
	account: initialAccountState,
	accounts: initialAccountsState
});

// requires the DT test to supply i18n and rowState (if pertinent)
export const getBlankDTGeneratorPayload = () => ({
	rowNum: 1,
	rowState: null,
	countryI18n: {},
	existingRowData: [],
	countryData: {},
	workerResources: {
		workerUtils: ''
	}
});

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '~core/apolloClient';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { getInitialState } from '~store/generator/generator.reducer';
import { initialState as initialMainState } from '~store/main/main.reducer';
import { initialState as initialPacketState } from '~store/packets/packets.reducer';
import { initialState as initialAccountState } from '~store/account/account.reducer';
import * as langUtils from '~utils/langUtils';
import { setLocaleFileLoaded } from '~store/main/main.actions';
import generatorReducer from '~store/generator/generator.reducer';
import mainReducer from '~store/main/main.reducer';
import packetsReducer from '~store/packets/packets.reducer';
import accountReducer from '~store/account/account.reducer';
import actionsInterceptor from '~core/actionInterceptor';
import { GeneratorLayout } from '~core/generator/Generator.component';
import { ETSettings } from '~types/exportTypes';

const i18n = require('../src/i18n/en.json');
const jsonI18n = require('../src/plugins/exportTypes/JSON/i18n/en.json');


export const rootReducer = combineReducers({
	generator: generatorReducer,
	main: mainReducer,
	packets: packetsReducer,
	account: accountReducer
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
			<ApolloProvider client={apolloClient}>
				<Provider store={store}>
					<Router history={history}>{component}</Router>
				</Provider>
			</ApolloProvider>
		),
		history
	};
};

export const getTestState = () => ({
	generator: getInitialState(),
	main: { ...initialMainState },
	packets: { ...initialPacketState },
	account: { ...initialAccountState }
});

// requires the DT test to supply i18n and rowState (if pertinent)
export const getBlankDTGeneratorPayload = () => ({
	rowNum: 1,
	rowState: null,
	countryI18n: {},
	existingRowData: [],
	countryData: {},
	workerUtilsUrl: ''
});


export const defaultETSettings: ETSettings = {
	onUpdate: () => {},
	data: null,
	coreI18n: {},
	i18n: {},
	id: 'id',
	layout: 'horizontal' as GeneratorLayout
};

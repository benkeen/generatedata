import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '~core/apolloClient';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { getInitialState } from '~store/generator/generator.reducer';
import { initialState as initialMainState } from '~store/main/main.reducer';
import { initialState as initialPacketState } from '~store/packets/packets.reducer';
import { initialState as initialAccountState } from '~store/account/account.reducer';
import langUtils from '@generatedata/utils/lang';
import { setLocaleFileLoaded } from '~store/main/main.actions';
import generatorReducer from '~store/generator/generator.reducer';
import mainReducer from '~store/main/main.reducer';
import packetsReducer from '~store/packets/packets.reducer';
import accountReducer from '~store/account/account.reducer';
import actionsInterceptor from '~core/actionInterceptor';
import { GeneratorLayout } from '@generatedata/types';
import { ETSettings } from '~types/exportTypes';

import i18n from '../src/i18n/en.json';
import jsonI18n from '@generatedata/plugins/dist/exportTypes/JSON/i18n/en.json';

export const rootReducer = combineReducers({
	generator: generatorReducer,
	main: mainReducer,
	packets: packetsReducer,
	account: accountReducer
});

export const renderWithStoreAndRouter = (component: any) => {
	const initialState = getTestState();
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState
		// compose(applyMiddleware(thunk, actionsInterceptor
	});
	const route = '/';
	const history = createMemoryHistory({ initialEntries: [route] });

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

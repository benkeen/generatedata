import { ApolloProvider } from '@apollo/client/react';
import langUtils from '@generatedata/utils/lang';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { combineReducers } from 'redux';
import { apolloClient } from '~core/apolloClient';
import accountReducer, { getInitialState as getInitialAccountState } from '~store/account/account.reducer';
import generatorReducer, { getInitialState } from '~store/generator/generator.reducer';
import { setLocaleFileLoaded } from '~store/main/main.actions';
import mainReducer, { getInitialState as getMainInitialState } from '~store/main/main.reducer';
import packetsReducer, { getInitialState as getInitialPacketState } from '~store/packets/packets.reducer';

import i18n from '../../../packages/i18n-core/locales/en.json';

// @ts-ignore - TODO
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

  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

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
          <Router navigator={history} location={state.location} navigationType={state.action}>
            {component}
          </Router>
        </Provider>
      </ApolloProvider>
    ),
    history
  };
};

export const getTestState = () => ({
  generator: getInitialState(),
  main: getMainInitialState(),
  packets: { ...getInitialPacketState() },
  account: { ...getInitialAccountState() }
});

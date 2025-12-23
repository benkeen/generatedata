/* istanbul ignore file */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import actionsInterceptor from '../actionInterceptor'; // TODO
import accountReducer from './account/account.reducer';
import generatorReducer from './generator/generator.reducer'; // , { GeneratorState }
import mainReducer from './main/main.reducer';
import packetsReducer from './packets/packets.reducer';
import { persistStore } from './persistor';

function initStore(): any {
  const preloadedDataStr = localStorage.getItem('generatedata');
  let preloadedState;

  try {
    preloadedState = preloadedDataStr ? JSON.parse(preloadedDataStr) : undefined;
  } catch {
    // do nothing
  }

  const rootReducer = combineReducers({
    account: accountReducer,
    main: mainReducer,
    generator: generatorReducer,
    packets: packetsReducer
  });

  const storeData = {
    reducer: rootReducer,
    enhancers: (getDefaultEnhancers: any) => getDefaultEnhancers()
    // composeEnhancers(applyMiddleware(thunk, actionsInterceptor), ...enhancers)
  };

  if (preloadedState) {
    // @ts-ignore-line
    storeData['preloadedState'] = preloadedState;
  }

  const store = configureStore(storeData);

  return store;
}

// for testing we set up our own mock stores with the subset of whatever we want to examine
let store: any;
if (process.env.NODE_ENV !== 'test') {
  store = initStore();
}

// custom serialization layer. This is a real shame - redux-persist was good. But the project is abandoned, and I didn't
// like the current available alternatives.
store.subscribe(() => persistStore(store));

export default store;

/* istanbul ignore file */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import actionsInterceptor from '../actionInterceptor'; // TODO
import accountReducer from './account/account.reducer';
import generatorReducer from './generator/generator.reducer'; // , { GeneratorState }
import mainReducer from './main/main.reducer';
import packetsReducer from './packets/packets.reducer';
import { persistStore } from './persistor';

// let persistor: Persistor;
function initStore(): any {
  // let preloadedState = {};
  // if (localStorage.getItem('generatedata')) {
  //   preloadedState = JSON.parse(localStorage.getItem('generatedata') || '{}');
  // }

  // const rootPersistConfig = {
  //   key: 'root',
  //   storage,
  //   blacklist: ['generator', 'main', 'packets']
  // };

  // const accountPersistConfig = {
  //   key: 'account',
  //   storage,
  //   blacklist: ['yourAccount', 'editAccount']
  // };

  // const rootReducer = combineReducers({
  //   main: persistReducer(mainPersistConfig, mainReducer),
  //   packets: persistReducer(packetsPersistConfig, packetsReducer),
  //   account: persistReducer(accountPersistConfig, accountReducer)
  // });

  // const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

  const rootReducer = combineReducers({
    account: accountReducer,
    main: mainReducer,
    generator: generatorReducer,
    packets: packetsReducer
  });
  // type RootState = ReturnType<typeof rootReducer>;

  const store = configureStore({
    reducer: rootReducer,
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers()
    // preloadedState
    // composeEnhancers(applyMiddleware(thunk, actionsInterceptor), ...enhancers)
  });

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

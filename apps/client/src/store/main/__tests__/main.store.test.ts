// import { createStore, applyMiddleware, Store } from 'redux';
// // import { FlushThunks } from 'redux-testkit';
// import { configureStore } from '@reduxjs/toolkit';
// import { rootReducer } from '../../../../../tests/testHelpers';
// import * as actions from '../main.actions';
// import * as selectors from '../main.selectors';

// describe('accounts section', () => {
// 	// let flushThunks;
// 	let store: Store;

// 	beforeEach(() => {
// 		// flushThunks = FlushThunks.createMiddleware();
// 		store = configureStore({
// 			reducer: rootReducer
// 		});
// 	});

// 	it('resetting store returns data to default state', () => {
// 		expect(selectors.localeFileLoaded(store.getState())).toEqual(false);

// 		store.dispatch(actions.setLocaleFileLoaded('en'));
// 		expect(selectors.localeFileLoaded(store.getState())).toEqual(true);

// 		store.dispatch(actions.resetStore());
// 		expect(selectors.localeFileLoaded(store.getState())).toEqual(false);
// 	});

// 	it('login dialog visibility', () => {
// 		expect(selectors.shouldShowLoginDialog(store.getState())).toEqual(false);

// 		store.dispatch(actions.setLoginDialogVisibility(true));
// 		expect(selectors.shouldShowLoginDialog(store.getState())).toEqual(true);

// 		store.dispatch(actions.setLoginDialogVisibility(false));
// 		expect(selectors.shouldShowLoginDialog(store.getState())).toEqual(false);
// 	});

// 	it('sets auth', () => {
// 		expect(selectors.isLoggedIn(store.getState())).toEqual(false);

// 		store.dispatch(actions.setAuthenticated(true));
// 		expect(selectors.isLoggedIn(store.getState())).toEqual(true);
// 	});
// });

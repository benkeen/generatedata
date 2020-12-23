import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';
import { rootReducer } from '../../../../../tests/testHelpers';
import * as actions from '../main.actions';
import * as selectors from '../main.selectors';

describe('accounts section', () => {
	let flushThunks;
	let store: Store;

	beforeEach(() => {
		flushThunks = FlushThunks.createMiddleware();
		store = createStore(rootReducer, applyMiddleware(flushThunks, thunk));
	});

	it('resetting store returns data to default state', () => {
		expect(selectors.localeFileLoaded(store.getState())).toEqual(false);

		store.dispatch(actions.setLocaleFileLoaded('en'));
		expect(selectors.localeFileLoaded(store.getState())).toEqual(true);

		store.dispatch(actions.resetStore());
		expect(selectors.localeFileLoaded(store.getState())).toEqual(false);
	});

	// it('updates an account', () => {
	//
	// 	// check default account info state
	// 	expect(selectors.getFirstName(store.getState())).toEqual('');
	// 	expect(selectors.getLastName(store.getState())).toEqual('');
	// 	expect(selectors.getEmail(store.getState())).toEqual('');
	// 	expect(selectors.getCountry(store.getState())).toEqual('');
	// 	expect(selectors.getRegion(store.getState())).toEqual('');
	//
	// 	store.dispatch(actions.updateAccount({
	// 		firstName: 'Tom',
	// 		lastName: 'Jones',
	// 		email: 'tom@jones.net',
	// 		country: 'Canada',
	// 		region: 'British Columbia'
	// 	}));
	//
	// 	// check nothing has been changed in the main state for the user
	// 	expect(selectors.getFirstName(store.getState())).toEqual('');
	// 	expect(selectors.getLastName(store.getState())).toEqual('');
	// 	expect(selectors.getEmail(store.getState())).toEqual('');
	// 	expect(selectors.getCountry(store.getState())).toEqual('');
	// 	expect(selectors.getRegion(store.getState())).toEqual('');
	//
	// 	// now confirm the editing data has been updated
	// 	const editingData = selectors.getEditingData(store.getState());
	// 	expect(editingData.firstName).toEqual('Tom');
	// 	expect(editingData.lastName).toEqual('Jones');
	// 	expect(editingData.email).toEqual('tom@jones.net');
	// 	expect(editingData.country).toEqual('Canada');
	// 	expect(editingData.region).toEqual('British Columbia');
	// });

});

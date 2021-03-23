import { createStore, combineReducers } from 'redux';
import reducer from '../main.reducer';
import * as selectors from '../main.selectors';
import * as actions from '../main.actions';
import { setAuthenticationData } from '../main.actions';
import C from '../../../constants';

describe('main actions', () => {
	let store: any;
	beforeEach(() => {
		store = createStore(combineReducers({
			main: reducer
		}));
	});

	it('the locale file is not loaded by default', () => {
		expect(selectors.localeFileLoaded(store.getState())).toEqual(false);
	});

	it('sets the locale as loaded', () => {
		store.dispatch(actions.setLocaleFileLoaded('en'));
		expect(selectors.localeFileLoaded(store.getState())).toEqual(true);
	});

	it('authorization sets appropriate values', () => {
		expect(selectors.getAppStateVersion(store.getState())).toEqual(C.APP_STATE_VERSION);
		expect(selectors.getAuthMethod(store.getState())).toEqual('default');
		expect(selectors.isLoggedIn(store.getState())).toEqual(false);
		expect(selectors.getAuthToken(store.getState())).toEqual('');

		store.dispatch(setAuthenticationData({
			authMethod: 'google',
			token: '123456',
			firstName: 'Jim',
			lastName: 'Beam',
			email: 'jim@beam.net',
			country: 'United States',
			region: 'Montana',
			profileImage: 'image-here.jpg',
			expiryDate: '1000010101001',
			dateCreated: '1000010101001',
			accountType: 'admin',
			numRowsGenerated: 50000
		}));

		expect(selectors.getAuthMethod(store.getState())).toEqual('google');
		expect(selectors.isLoggedIn(store.getState())).toEqual(true);
		expect(selectors.getAuthToken(store.getState())).toEqual('123456');
	});
});

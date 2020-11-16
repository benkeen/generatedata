import { createStore, combineReducers } from 'redux';
import reducer from '../main.reducer';
import * as selectors from '../main.selectors';
import * as actions from '../main.actions';

describe('generator section', () => {
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
});

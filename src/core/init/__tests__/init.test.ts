import { createStore, combineReducers } from 'redux';
import * as sinon from 'sinon';
import * as actions from '../init.actions';
import * as selectors from '../init.selectors';
import { reducer } from '../init.reducer';

describe('generator section', () => {
	let store: any;
	beforeEach(() => {
		store = createStore(combineReducers({
			init: reducer
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
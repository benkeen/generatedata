import { persistReducer } from 'redux-persist';
import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './init.actions';
import storage from 'redux-persist/lib/storage';

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
const reducer = (state = {
	localeFileLoaded: false,
	locale: 'en'
}, action) => {
	switch (action.type) {
		case actions.LOCALE_FILE_LOADED:
			return {
				...state,
				locale: action.payload.locale,
				localeFileLoaded: true
			};
		default:
			return state;
	}
};

const initPersistConfig = {
	key: 'init',
	storage: storage,
	whitelist: ['locale']
};

reducerRegistry.register('init', persistReducer(initPersistConfig, reducer));

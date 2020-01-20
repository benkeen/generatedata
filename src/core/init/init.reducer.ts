import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './init.actions';
import storage from 'redux-persist/lib/storage';
import { GDLocale } from '../../../types/general';

type InitReducer = {
	localeFileLoaded: boolean;
	locale: GDLocale;
};

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
export const reducer = (state: InitReducer = {
	localeFileLoaded: false,
	locale: 'en'
}, action: AnyAction): InitReducer => {
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

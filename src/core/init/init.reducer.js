import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './init.actions';

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
const reducer = (state = {
	localeFileLoaded: false,
	locale: 'en',
	i18n: null,
	rows: []
}, action) => {
	switch (action.type) {
		case actions.LOCALE_FILE_LOADED:
			return {
				...state,
				locale: action.payload.locale,
				i18n: action.payload.i18n,
				localeFileLoaded: true
			};
		default:
			return state;
	}
};

reducerRegistry.register('init', reducer);

import { AnyAction } from 'redux';
import * as actions from './main.actions';
import { GDLocale } from '../../../../types/general';

export type MainState = {
	localeFileLoaded: boolean;
	locale: GDLocale;
	showIntroDialog: boolean;
};

const defaultState: MainState = {
	localeFileLoaded: false,
	locale: 'en',
	showIntroDialog: true
};

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
export const reducer = (state = defaultState, action: AnyAction): MainState => {
	switch (action.type) {
		case actions.LOCALE_FILE_LOADED:
			return {
				...state,
				locale: action.payload.locale,
				localeFileLoaded: true
			};

		case actions.TOGGLE_INTRO_DIALOG:
			return {
				...state,
				showIntroDialog: !state.showIntroDialog
			};

		default:
			return state;
	}
};

export default reducer;

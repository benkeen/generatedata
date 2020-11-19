import { AnyAction } from 'redux';
import produce from 'immer';
import * as actions from './main.actions';
import { GDLocale } from '~types/general';
import C from '../../constants';
import env from '../../../../_env';

export type MainState = {
	appStateVersion: number;
	localeFileLoaded: boolean;
	locale: GDLocale;
	showIntroDialog: boolean;
};

export const initialState: MainState = {
	appStateVersion: C.APP_STATE_VERSION,
	localeFileLoaded: false,
	locale: env.defaultLocale,
	showIntroDialog: true
};

export const reducer = produce((draft: MainState, action: AnyAction) => {
	switch (action.type) {
		case actions.RESET_STORE:
			Object.keys(initialState).forEach((key) => {
				// @ts-ignore-line
				draft[key] = initialState[key];
			});
			break;

		case actions.LOCALE_FILE_LOADED:
			draft.locale = action.payload.locale;
			draft.localeFileLoaded = true;
			break;

		case actions.TOGGLE_INTRO_DIALOG:
			draft.showIntroDialog = !draft.showIntroDialog;
			break;
	}
}, initialState);

export default reducer;

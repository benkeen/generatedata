import { AnyAction } from 'redux';
import produce from 'immer';
import * as actions from './main.actions';
import C from '../../constants';
import env from '../../../../_env';
import { GDLocale } from '~types/general';

export type MainState = {
	appStateVersion: number;
	localeFileLoaded: boolean;
	locale: GDLocale;
	showIntroDialog: boolean;
	showLoginDialog: boolean;
	showSignUpDialog: boolean;
	isLoggedIn: boolean;
	userTokenVerified: boolean;
};

export const initialState: MainState = {
	appStateVersion: C.APP_STATE_VERSION,
	localeFileLoaded: false,
	locale: env.defaultLocale,
	showIntroDialog: true,
	showLoginDialog: false,
	showSignUpDialog: false,
	isLoggedIn: false,

	// by default we assume the user isn't logged in when the page first loads, so this is set to true. If they
	// *did* have a live session, this is set according during boot up when verifying their JWT
	userTokenVerified: true
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

		case actions.TOGGLE_LOGIN_DIALOG:
			draft.showLoginDialog = !draft.showLoginDialog;
			break;

		case actions.TOGGLE_SIGNUP_DIALOG:
			draft.showSignUpDialog = !draft.showSignUpDialog;
			break;

		case actions.AUTHENTICATED:
			draft.isLoggedIn = action.payload.authenticated;
			draft.userTokenVerified = true; // yup, even if they're not authenticated. Difficult var name - only applies for logged in users
			break;

		case actions.LOGOUT:
			draft.isLoggedIn = false;
			break;

		case actions.VERIFYING_TOKEN:
			draft.userTokenVerified = false;
			break;
	}

}, initialState);

export default reducer;

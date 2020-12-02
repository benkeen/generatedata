import { AnyAction } from 'redux';
import produce from 'immer';
import * as actions from './main.actions';
import C from '../../constants';
import env from '../../../../_env';
import { AuthMethod, GDLocale } from '~types/general';

export type MainState = {
	appStateVersion: number;
	authMethod: AuthMethod;
	localeFileLoaded: boolean;
	locale: GDLocale;
	showIntroDialog: boolean;
	showLoginDialog: boolean;
	isLoggedIn: boolean;
	authToken: string;
	isOnloadAuthDetermined: boolean;
	isRefreshingToken: boolean;
	isLoggingIn: boolean;
	currentPage: string;
};

export const initialState: MainState = {
	appStateVersion: C.APP_STATE_VERSION,
	authMethod: 'default',
	localeFileLoaded: false,
	locale: env.defaultLocale,
	showIntroDialog: true,
	showLoginDialog: false,
	isLoggedIn: false,
	authToken: '',
	isOnloadAuthDetermined: false,
	isRefreshingToken: false,
	isLoggingIn: false,
	currentPage: ''
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

		case actions.SET_LOGIN_DIALOG_VISIBILITY:
			draft.showLoginDialog = action.payload.visible;
			break;

		case actions.AUTHENTICATED:
			draft.isLoggedIn = action.payload.authenticated;
			draft.isRefreshingToken = true; // yup, even if they're not authenticated. Difficult var name - only applies for logged in users
			break;

		case actions.SET_AUTHENTICATION_DATA:
			draft.isLoggedIn = true;
			draft.isLoggingIn = false;
			draft.authToken = action.payload.token;
			draft.authMethod = action.payload.authMethod;
			break;

		case actions.LOGOUT:
			draft.isLoggedIn = false;
			draft.authToken = '';
			break;

		case actions.REFRESHING_TOKEN:
			draft.isRefreshingToken = false;
			break;

		case actions.SET_AUTH_TOKEN:
			draft.authToken = action.payload.token;
			break;

		case actions.START_LOGIN:
			draft.isLoggingIn = true;
			break;

		case actions.ONLOAD_AUTH_DETERMINED:
			draft.isOnloadAuthDetermined = true;
			break;

		case actions.PAGE_CHANGE:
			draft.currentPage = action.payload.page;
			break;
	}

}, initialState);

export default reducer;

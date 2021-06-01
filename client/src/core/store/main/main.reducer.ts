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
	showLoginDialog: boolean;
	loginDialogDefaultEmail: string;
	showPasswordResetDialog: boolean;
	isLoggedIn: boolean;
	authToken: string;
	isOnloadAuthDetermined: boolean;
	isRefreshingToken: boolean;
	dialogProcessing: boolean;
	currentPage: string;
	tourIntroDialogVisible: boolean;
	tourBundleLoaded: boolean;
};

export const initialState: MainState = {
	appStateVersion: C.APP_STATE_VERSION,
	authMethod: AuthMethod.default,
	localeFileLoaded: false,
	locale: env.defaultLocale,
	showLoginDialog: false,
	loginDialogDefaultEmail: '',
	showPasswordResetDialog: false,
	isLoggedIn: false,
	authToken: '',
	isOnloadAuthDetermined: false,
	isRefreshingToken: false,
	dialogProcessing: false,
	currentPage: '',
	tourIntroDialogVisible: false,
	tourBundleLoaded: false
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

		case actions.SET_LOGIN_DIALOG_VISIBILITY:
			draft.showLoginDialog = action.payload.visible;

			if (action.payload.email) {
				draft.loginDialogDefaultEmail = action.payload.email;
			}
			break;

		case actions.SET_PASSWORD_RESET_DIALOG_VISIBILITY:
			draft.showPasswordResetDialog = action.payload.visible;
			break;

		case actions.AUTHENTICATED:
			draft.isLoggedIn = action.payload.authenticated;
			draft.isRefreshingToken = true; // yup, even if they're not authenticated. Difficult var name - only applies for logged in users
			break;

		case actions.SET_AUTHENTICATION_DATA:
			draft.isLoggedIn = true;
			draft.dialogProcessing = false;
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

		case actions.START_DIALOG_PROCESSING:
			draft.dialogProcessing = true;
			break;

		case actions.STOP_DIALOG_PROCESSING:
			draft.dialogProcessing = false;
			break;

		case actions.LOGIN_ERROR:
			draft.dialogProcessing = false;
			break;

		case actions.ONLOAD_AUTH_DETERMINED:
			draft.isOnloadAuthDetermined = true;
			break;

		case actions.PAGE_CHANGE:
			draft.currentPage = action.payload.page;
			break;

		case actions.SHOW_TOUR_INTRO_DIALOG:
			draft.tourIntroDialogVisible = true;
			break;

		case actions.HIDE_TOUR_INTRO_DIALOG:
			draft.tourIntroDialogVisible = false;
			break;

		case actions.TOUR_BUNDLE_LOADED:
			draft.tourBundleLoaded = true;
			break;

		case actions.CLEAR_DEFAULT_EMAIL:
			draft.loginDialogDefaultEmail = '';
			break;
	}

}, initialState);

export default reducer;

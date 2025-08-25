import { AnyAction } from 'redux';
import { produce } from 'immer';
import * as actions from './main.actions';
import C from '@generatedata/config/constants';
import { AccountStatusFilter, AuthMethod, GDLocale } from '~types/general';
import { ColSortDir } from '~components/tables/TableHeader.component';
import clientConfig from '@generatedata/config/clientConfig';

export type MainState = {
	appStateVersion: number;
	authMethod: AuthMethod;
	localeFileLoading: boolean;
	localeFileLoaded: boolean;
	locale: GDLocale;
	showLoginDialog: boolean;
	loginDialogDefaultEmail: string;
	showPasswordResetDialog: boolean;
	passwordResetDialogDefaultEmail: string;
	isLoggedIn: boolean;
	authToken: string;
	isOnloadAuthDetermined: boolean;
	isRefreshingToken: boolean;
	dialogProcessing: boolean;

	// not 100% sure why this is stored in state - but possibly just to allow components to re-render when it changes
	currentPage: string;
	tourIntroDialogVisible: boolean;
	tourBundleLoaded: boolean;
	accountsCurrentPage: number;
	accountsSortCol: string;
	accountsSortDir: ColSortDir;
	accountsFilterStr: string;
	accountStatusFilter: AccountStatusFilter;
};

export const initialState: MainState = {
	appStateVersion: C.APP_STATE_VERSION,
	authMethod: AuthMethod.default,
	localeFileLoading: false,
	localeFileLoaded: false,
	locale: clientConfig.appSettings.GD_DEFAULT_LOCALE,
	showLoginDialog: false,
	loginDialogDefaultEmail: '',
	showPasswordResetDialog: false,
	passwordResetDialogDefaultEmail: '',
	isLoggedIn: false,
	authToken: '',
	isOnloadAuthDetermined: false,
	isRefreshingToken: false,
	dialogProcessing: false,
	currentPage: '',
	tourIntroDialogVisible: false,
	tourBundleLoaded: false,
	accountsCurrentPage: 1,
	accountsSortCol: 'lastName',
	accountsSortDir: ColSortDir.asc,
	accountsFilterStr: '',
	accountStatusFilter: AccountStatusFilter.all
};

export const reducer = produce((draft: MainState, action: AnyAction) => {
	switch (action.type) {
		case actions.RESET_STORE:
			Object.keys(initialState).forEach((key) => {
				// @ts-ignore-line
				draft[key] = initialState[key];
			});
			break;

		case actions.LOCALE_FILE_LOADING:
			draft.localeFileLoading = true;
			break;

		case actions.LOCALE_FILE_LOADED:
			draft.locale = action.payload.locale;
			draft.localeFileLoaded = true;
			draft.localeFileLoading = false;
			break;

		case actions.SET_LOGIN_DIALOG_VISIBILITY:
			draft.showLoginDialog = action.payload.visible;

			if (action.payload.email) {
				draft.loginDialogDefaultEmail = action.payload.email;
			}
			break;

		case actions.SET_PASSWORD_RESET_DIALOG_VISIBILITY:
			draft.showPasswordResetDialog = action.payload.visible;
			if (action.payload.email) {
				draft.passwordResetDialogDefaultEmail = action.payload.email;
			}
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
			draft.accountsCurrentPage = 1;
			draft.accountsSortCol = 'lastName';
			draft.accountsSortDir = ColSortDir.asc;
			draft.accountsFilterStr = '';
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

		case actions.SET_ACCOUNTS_SORT_DIR:
			draft.accountsSortDir = action.payload.sortDir;
			break;

		case actions.SET_ACCOUNTS_SORT_COL:
			draft.accountsSortCol = action.payload.sortCol;
			break;

		case actions.SET_ACCOUNTS_CURRENT_PAGE:
			draft.accountsCurrentPage = action.payload.page;
			break;

		case actions.SET_ACCOUNTS_FILTER_STRING:
			draft.accountsCurrentPage = 1;
			draft.accountsFilterStr = action.payload.filter;
			break;

		case actions.SET_ACCOUNT_STATUS_FILTER:
			draft.accountsCurrentPage = 1;
			draft.accountStatusFilter = action.payload.status;
			break;
	}
}, initialState);

export default reducer;

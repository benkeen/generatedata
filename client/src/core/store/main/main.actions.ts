import { Dispatch } from 'redux';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import { AccountStatusFilter, AuthMethod, GDAction, GDLocale } from '~types/general';
import * as langUtils from '~utils/langUtils';
import { getStrings, getCurrentLocalizedPath } from '~utils/langUtils';
import { apolloClient } from '../../apolloClient';
import { getCurrentPage, getLocale } from '~store/main/main.selectors';
import { setAuthTokenRefresh } from '~utils/authUtils';
import { AccountStatus, AccountType, SelectedAccountTab } from '~types/account';
import store from '~core/store';
import { onChangeTab, showSaveDataSetDialog } from '~store/account/account.actions';
import { addToast, setTourComponents } from '~utils/generalUtils';
import { getGeneratorRoute, updateBodyClass } from '~utils/routeUtils';
import * as actions from '~store/generator/generator.actions';
import { CLEAR_GRID } from '~store/generator/generator.actions';
import C from '~core/constants';
import { SaveDataDialogType } from '~store/account/account.reducer';
import { localeFileMap } from '../../../../_localeFileMap';
import { ColSortDir } from '~components/tables/TableHeader.component';

export const LOCALE_FILE_LOADED = 'LOCALE_FILE_LOADED';
export const setLocaleFileLoaded = (locale: GDLocale): GDAction => ({
	type: LOCALE_FILE_LOADED,
	payload: {
		locale
	}
});

export const LOCALE_FILE_LOADING = 'LOCALE_FILE_LOADING';
export const setLocaleFileLoading = (): GDAction => ({ type: LOCALE_FILE_LOADING });

export const selectLocale = (locale: GDLocale, history?: any): any => (dispatch: Dispatch): any => {
	dispatch(setLocaleFileLoading());

	window.gd = {};
	window.gd.localeLoaded = (strings: any): void => {
		langUtils.setLocale(locale, strings);
		dispatch(setLocaleFileLoaded(locale));
		Cookies.set('lang', locale);

		const htmlTag = document.querySelector('html');
		if (htmlTag) {
			htmlTag.setAttribute('lang', locale);
		}

		if (history) {
			history.push(getCurrentLocalizedPath(locale));
		}
	};
	const s = document.createElement('script');
	const filename = localeFileMap[locale];
	s.src = `./${filename}`;
	document.body.appendChild(s);
};

export const RESET_STORE = 'RESET_STORE';
export const resetStore = (): GDAction => ({ type: RESET_STORE });

export const PAGE_CHANGE = 'PAGE_CHANGE';
export const initRouteListener = (history: any): void => {
	updateBodyClass(store, history.location.pathname);

	history.listen((location: any) => {
		updateBodyClass(store, location.pathname);
	});
};

export const SET_LOGIN_DIALOG_VISIBILITY = 'SET_LOGIN_DIALOG_VISIBILITY';
export const setLoginDialogVisibility = (visible: boolean, email = ''): GDAction => ({
	type: SET_LOGIN_DIALOG_VISIBILITY,
	payload: {
		visible,
		email
	}
});

export const SET_PASSWORD_RESET_DIALOG_VISIBILITY = 'SET_PASSWORD_RESET_DIALOG_VISIBILITY';
export const setPasswordResetDialogVisibility = (visible: boolean, email = ''): GDAction => ({
	type: SET_PASSWORD_RESET_DIALOG_VISIBILITY,
	payload: {
		visible,
		email
	}
});

export const SET_AUTHENTICATION_DATA = 'SET_AUTHENTICATION_DATA';

export type AuthData = {
	token: string;
	accountId: number;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	region: string;
	profileImage: string;
	expiryDate: string;
	dateCreated: string;
	accountType: AccountType;
	accountStatus: AccountStatus;
	numRowsGenerated: number;
	authMethod?: AuthMethod;
};

export const setAuthenticationData = (authData: AuthData): GDAction => ({
	type: SET_AUTHENTICATION_DATA,
	payload: authData
});

export const AUTHENTICATED = 'AUTHENTICATED';
export const setAuthenticated = (authenticated = true): GDAction => ({
	type: AUTHENTICATED,
	payload: {
		authenticated
	}
});

export const START_DIALOG_PROCESSING = 'START_DIALOG_PROCESSING';
export const startDialogProcessing = (): GDAction => ({ type: START_DIALOG_PROCESSING });

export const STOP_DIALOG_PROCESSING = 'STOP_DIALOG_PROCESSING';
export const stopDialogProcessing = (): GDAction => ({ type: STOP_DIALOG_PROCESSING });

// hacky, but if we need something like this elsewhere I can revisit. This is used by the Login button in Save dialog.
// When the user clicks that, we want to return them to the Save dialog after authentication. The register process is more
// complicated so I think returning them to the save dialog after all that might be a bit much. They can always just
// re-click the Save button at that step (nothing would have been lost, unlike with v3)
let loginFlow = '';
export const setReturnToSaveDataSet = (): void => {
	loginFlow = 'fromSaveDataSet';
};

export const CLEAR_DEFAULT_EMAIL = 'CLEAR_DEFAULT_EMAIL';
export const clearLoginFlow = (): GDAction => {
	loginFlow = '';

	return { type: CLEAR_DEFAULT_EMAIL };
};

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const setLoginError = (): GDAction => ({ type: LOGIN_ERROR });

// default authentication
export const login = (email: string, password: string, history: any, onLoginError: any): any => {
	return async (dispatch: Dispatch): Promise<any> => {
		dispatch(startDialogProcessing());

		const response = await apolloClient.mutate({
			mutation: gql`
                mutation LoginMutation($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
						token
						tokenExpiry
						error
						refreshToken
						success
						accountId
						firstName
						lastName
						email
						country
						region
						expiryDate
						accountType
						accountStatus
						dateCreated
						numRowsGenerated
						profileImage
						wasOneTimeLogin
                    }
                }
			`,
			variables: { email, password }
		});

		if (response.data.login.success) {
			const { tokenExpiry, refreshToken } = response.data.login;
			dispatch(setAuthenticationData({
				...response.data.login,
				authMethod: 'default'
			}));

			Cookies.set('refreshToken', refreshToken, { expires: new Date(tokenExpiry) });

			if (response.data.login.wasOneTimeLogin) {
				onOneTimeLoginSuccess(tokenExpiry, password, history, dispatch);
			} else {
				onLoginSuccess(tokenExpiry, false, dispatch);
			}

		} else {
			dispatch(setLoginError());
			onLoginError(response.data.login.error);
		}
	};
};

export const onLoginSuccess = (tokenExpiry: number | null, onPageRender: boolean, dispatch: Dispatch): void => {
	const i18n = getStrings();

	if (tokenExpiry) {
		setAuthTokenRefresh(tokenExpiry, (): any => updateRefreshToken()(dispatch));
	}

	dispatch(setLoginDialogVisibility(false));

	if (!onPageRender) {
		addToast({
			type: 'success',
			message: i18n.core.nowLoggedIn
		});

		if (loginFlow === 'fromSaveDataSet') {
			dispatch(showSaveDataSetDialog(SaveDataDialogType.save));
			loginFlow = '';
		}
	}
};

export const SET_ONE_TIME_PASSWORD = 'SET_ONE_TIME_PASSWORD';
export const setOneTimePassword = (password: string): GDAction => ({ type: SET_ONE_TIME_PASSWORD, payload: { password } });

export const onOneTimeLoginSuccess = (tokenExpiry: number, password: string, history: any, dispatch: Dispatch): void => {
	const i18n = getStrings();
	setAuthTokenRefresh(tokenExpiry, (): any => updateRefreshToken()(dispatch));
	dispatch(setLoginDialogVisibility(false));
	dispatch(setOneTimePassword(password));

	history.push('/account');
	dispatch(onChangeTab(SelectedAccountTab.changePassword));

	addToast({
		type: 'success',
		message: i18n.core.nowLoggedIn
	});
};

export const LOGOUT = 'LOGOUT';
export const logout = (): any => async (dispatch: Dispatch): Promise<any> => {
	const i18n = getStrings();

	Cookies.remove('refreshToken');

	dispatch({ type: LOGOUT });
	dispatch({ type: CLEAR_GRID });
	dispatch(actions.addRows(C.NUM_DEFAULT_ROWS));

	addToast({
		type: 'success',
		message: i18n.core.nowLoggedOut
	});

	// doesn't awfully matter if this fails. It's just for cleanup
	await apolloClient.mutate({
		mutation: gql`
            mutation Logout {
                logout {
                    success
                }
            }
		`
	});
};

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = (token: string): GDAction => ({ type: SET_AUTH_TOKEN, payload: { token } });

export const REFRESHING_TOKEN = 'REFRESHING_TOKEN';
export const updateRefreshToken = () => async (dispatch: Dispatch): Promise<any> => {
	dispatch({ type: REFRESHING_TOKEN });

	const response = await apolloClient.mutate({
		mutation: gql`
            mutation RefreshToken {
                refreshToken {
                    token
                    tokenExpiry
					refreshToken
                    success
                    firstName
                    lastName
                    email
                    country
                    region
                    expiryDate
                    accountType
                    dateCreated
                    numRowsGenerated
                    profileImage
                }
            }
		`
	});

	const success = response.data.refreshToken.success;
	if (success) {
		const { token, tokenExpiry, refreshToken } = response.data.refreshToken;

		Cookies.set('refreshToken', refreshToken, { expires: new Date(tokenExpiry) });

		setAuthTokenRefresh(tokenExpiry, (): any => updateRefreshToken()(dispatch));
		dispatch(setAuthenticationData(response.data.refreshToken));
		dispatch(setAuthToken(token));
	} else {
		// console.log('token NOT refreshed -- user logged out');
	}

	dispatch(setAuthenticated(success));
	dispatch(setOnloadAuthDetermined());
};

export const ONLOAD_AUTH_DETERMINED = 'ONLOAD_AUTH_DETERMINED';
export const setOnloadAuthDetermined = (): GDAction => ({ type: ONLOAD_AUTH_DETERMINED });

export const SHOW_TOUR_INTRO_DIALOG = 'SHOW_TOUR_INTRO_DIALOG';
export const showTourIntroDialog = (history?: any) => (dispatch: Dispatch, getState: any): any => {
	const state = getState();
	const locale = getLocale(state);
	const generatorRoute = getGeneratorRoute(locale);

	// the tour is specific to the generator page, so always redirect there when showing/hiding it
	if (history && getCurrentPage(state) !== generatorRoute) {
		history.push(generatorRoute);
	}

	dispatch({ type: SHOW_TOUR_INTRO_DIALOG });
};

export const HIDE_TOUR_INTRO_DIALOG = 'HIDE_TOUR_INTRO_DIALOG';
export const hideTourIntroDialog = (): GDAction => ({ type: HIDE_TOUR_INTRO_DIALOG });

export const TOUR_BUNDLE_LOADED = 'TOUR_BUNDLE_LOADED';
export const loadTourBundle = (): any => (dispatch: Dispatch): void => {
	const i18n = getStrings();

	// TODO check hashing of bundle here
	import(
		/* webpackChunkName: "tour" */
		/* webpackMode: "lazy" */
		'../../../tours'
	)
		.then((resp) => {
			setTourComponents(resp.default);
			dispatch({ type: TOUR_BUNDLE_LOADED });
		})
		.catch(() => {
			dispatch(hideTourIntroDialog());

			addToast({
				type: 'success',
				message: i18n.core.problemLoadingTour
			});
		});
};


export const sendPasswordResetEmail = (email: string, onLoginError: any): any => async (dispatch: Dispatch): Promise<any> => {
	const i18n = getStrings();

	dispatch(startDialogProcessing());

	const response = await apolloClient.mutate({
		mutation: gql`
            mutation SendPasswordResetEmailMutation($email: String!) {
                sendPasswordResetEmail(email: $email) {
                    success
                }
            }
		`,
		variables: { email }
	});

	if (response.data.sendPasswordResetEmail.success) {
		addToast({
			type: 'success',
			message: i18n.core.passwordResetMsg
		});
		dispatch(setPasswordResetDialogVisibility(false));
		dispatch(setLoginDialogVisibility(true, email));
		dispatch(stopDialogProcessing());
	} else {
		dispatch(setLoginError());
		onLoginError();
	}
};

export const SET_ACCOUNTS_SORT_DIR = 'SET_ACCOUNTS_SORT_DIR';
export const setAccountsSortDir = (sortDir: ColSortDir): any => ({ type: SET_ACCOUNTS_SORT_DIR, payload: { sortDir } });

export const SET_ACCOUNTS_SORT_COL = 'SET_ACCOUNTS_SORT_COL';
export const setAccountsSortCol = (sortCol: string): any => ({ type: SET_ACCOUNTS_SORT_COL, payload: { sortCol } });

export const SET_ACCOUNTS_CURRENT_PAGE = 'SET_ACCOUNTS_CURRENT_PAGE';
export const setAccountsCurrentPage = (page: number): any => ({ type: SET_ACCOUNTS_CURRENT_PAGE, payload: { page } });

export const SET_ACCOUNTS_FILTER_STRING = 'SET_ACCOUNTS_FILTER_STRING';
export const setAccountsFilterString = (filter: string): any => ({ type: SET_ACCOUNTS_FILTER_STRING, payload: { filter } });

export const SET_ACCOUNT_STATUS_FILTER = 'SET_ACCOUNT_STATUS_FILTER';
export const setAccountStatusFilter = (status: AccountStatusFilter): any => ({ type: SET_ACCOUNT_STATUS_FILTER, payload: { status } });

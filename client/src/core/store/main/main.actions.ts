import { Dispatch } from 'redux';
import { gql } from '@apollo/client';
import { AuthMethod, GDAction, GDLocale } from '~types/general';
import * as langUtils from '~utils/langUtils';
import { apolloClient } from '../../apolloClient';
import { getAuthMethod } from '~store/main/main.selectors';
import { logoutVendor, setAuthTokenRefresh } from '~utils/authUtils';
import { AccountType } from '~types/account';

export const LOCALE_FILE_LOADED = 'LOCALE_FILE_LOADED';
export const setLocaleFileLoaded = (locale: GDLocale): GDAction => ({
	type: LOCALE_FILE_LOADED,
	payload: {
		locale
	}
});

export const selectLocale = (locale: GDLocale): any => (dispatch: Dispatch): any => {
	window.gd = {};
	window.gd.localeLoaded = (strings: any): void => {
		langUtils.setLocale(locale, strings);
		dispatch(setLocaleFileLoaded(locale));
	};
	const s = document.createElement('script');
	s.src = `./${locale}.js`;
	document.body.appendChild(s);
};

export const TOGGLE_INTRO_DIALOG = 'TOGGLE_INTRO_DIALOG';
export const toggleIntroDialog = (): GDAction => ({ type: TOGGLE_INTRO_DIALOG });

export const RESET_STORE = 'RESET_STORE';
export const resetStore = (): GDAction => ({ type: RESET_STORE });

export const SET_LOGIN_DIALOG_VISIBILITY = 'SET_LOGIN_DIALOG_VISIBILITY';
export const setLoginDialogVisibility = (visible: boolean): GDAction => ({
	type: SET_LOGIN_DIALOG_VISIBILITY,
	payload: {
		visible
	}
});

export const SET_AUTHENTICATION_DATA = 'SET_AUTHENTICATION_DATA';

export type AuthData = {
	authMethod?: AuthMethod;
	token: string;
	firstName: string;
	lastName: string;
	email: string;
	profileImage: string;
	dateExpires: string;
	dateCreated: string;
	accountType: AccountType;
	numRowsGenerated: number;
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

export const START_LOGIN = 'START_LOGIN';
export const startLogin = (): GDAction => ({ type: START_LOGIN });

// default authentication
export const login = (email: string, password: string, onLoginError: Function): any => async (dispatch: Dispatch): Promise<any> => {
	dispatch(startLogin());

	const response = await apolloClient.mutate({
		mutation: gql`
            mutation LoginMutation($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
					tokenExpiry
					success
					firstName
                    lastName
                    dateExpires
                    accountType
                    dateCreated
                    email
                    numRowsGenerated
                    profileImage
                }
            }
		`,
		variables: { email, password }
	});

	if (response.data.login.success) {
		setAuthTokenRefresh(response.data.login.tokenExpiry, (): any => refreshToken()(dispatch));

		dispatch(setAuthenticationData({
			...response.data.login,
			authMethod: 'default'
		}));

		dispatch(setLoginDialogVisibility(false));
	} else {
		onLoginError();
	}
};

export const LOGOUT = 'LOGOUT';
export const logout = (): any => async (dispatch: Dispatch, getState: any): Promise<any> => {

	// if the user logged in with Google, Facebook etc. we need to also let them know
	logoutVendor(getAuthMethod(getState()));

	dispatch({ type: LOGOUT });

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
export const refreshToken = () => async (dispatch: Dispatch): Promise<any> => {
	dispatch({ type: REFRESHING_TOKEN });

	const response = await apolloClient.mutate({
		mutation: gql`
			mutation RefreshToken {
                refreshToken {
                    token
                    tokenExpiry
                    success
                    firstName
                    lastName
                    dateExpires
                    accountType
                    dateCreated
                    email
                    numRowsGenerated
                    profileImage
				}
            }
		`
	});

	const success = response.data.refreshToken.success;
	if (success) {
		const { token, tokenExpiry } = response.data.refreshToken;
		setAuthTokenRefresh(tokenExpiry, (): any => refreshToken()(dispatch));
		dispatch(setAuthenticationData(response.data.refreshToken));
		dispatch(setAuthToken(token));
	} else {
		console.log('token NOT refreshed', response);
	}

	dispatch(setAuthenticated(success));
	dispatch(setOnloadAuthDetermined());
};

export const ONLOAD_AUTH_DETERMINED = 'ONLOAD_AUTH_DETERMINED';
export const setOnloadAuthDetermined = (): GDAction => ({ type: ONLOAD_AUTH_DETERMINED });

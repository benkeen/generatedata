import { Dispatch } from 'redux';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import { GDAction, GDLocale } from '~types/general';
import * as langUtils from '~utils/langUtils';
import { apolloClient } from '../../apolloClient';
import { AuthMethod } from '~store/main/main.reducer';

export const LOCALE_FILE_LOADED = 'LOCALE_FILE_LOADED';
export const setLocaleFileLoaded = (locale: GDLocale): GDAction => ({
	type: LOCALE_FILE_LOADED,
	payload: {
		locale
	}
});

export const selectLocale = (locale: GDLocale) => (dispatch: Dispatch): any => {
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

export const TOGGLE_LOGIN_DIALOG = 'TOGGLE_LOGIN_DIALOG';
export const toggleLoginDialog = (): GDAction => ({ type: TOGGLE_LOGIN_DIALOG });

export const TOGGLE_SIGNUP_DIALOG = 'TOGGLE_SIGNUP_DIALOG';
export const toggleSignUpDialog = (): GDAction => ({ type: TOGGLE_SIGNUP_DIALOG });

export const SET_AUTHENTICATION_DATA = 'SET_AUTHENTICATION_DATA';
export const setAuthenticationData = (authMethod: AuthMethod, firstName: string) => ({
	type: SET_AUTHENTICATION_DATA,
	payload: {
		authMethod,
		firstName
	}
});

export const AUTHENTICATED = 'AUTHENTICATED';
export const setAuthenticated = (authenticated = true): GDAction => ({
	type: AUTHENTICATED,
	payload: {
		authenticated
	}
});

// default authentication
export const login = (email: string, password: string, onLoginError: Function): any => async (dispatch: Dispatch): Promise<any> => {
	const response = await apolloClient.mutate({
		mutation: gql`
            mutation LoginMutation($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
					success,
					firstName
                }
            }
		`,
		variables: { email, password }
	});

	if (response.data.login.success) {
		const { token, firstName } = response.data.login;
		Cookies.set('token', token);

		dispatch(setAuthenticationData('default', firstName));
		dispatch(toggleLoginDialog());
	} else {
		onLoginError();
	}
};

export const LOGOUT = 'LOGOUT';
export const logout = (): GDAction => {
	Cookies.remove('token');
	return { type: LOGOUT };
};

export const VERIFYING_TOKEN = 'VERIFYING_TOKEN';
export const verifyToken = () => async (dispatch: Dispatch): Promise<any> => {
	dispatch({ type: VERIFYING_TOKEN });

	const response = await apolloClient.query({
		query: gql`
			query VerifyToken {
				verifyToken {
					valid
				}
			}
		`
	});

	const isValid = response.data.verifyToken.valid;
	if (!isValid) {
		Cookies.remove('token');
	}

	dispatch(setAuthenticated(isValid));
};

import React, { useRef } from 'react';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import env from '../../../../_env';
import { apolloClient } from '../../apolloClient';
import store from '../../store';
import {
	onLoginSuccess,
	setAuthenticated,
	setAuthenticationData,
	setOnloadAuthDetermined
} from '~store/main/main.actions';
import { AuthMethod } from '~types/general';
import * as mainSelectors from '~store/main/main.selectors';
import { addToast } from '~utils/generalUtils';
import * as langUtils from '~utils/langUtils';

const googleBtnId = 'google-signin-button';

export const initGoogleAuth = (): void => {
	const script = document.createElement('script');
	script.src = 'https://accounts.google.com/gsi/client';
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
};

export type AuthenticatedOptions = {
	onPageRender?: boolean;
};

const onAuthenticated = async (googleUser: any, opts: AuthenticatedOptions = {}): Promise<any> => {
	const i18n = langUtils.getStrings();

	const options = {
		onPageRender: false,
		...opts
	};

	const isLoggedIn = mainSelectors.isLoggedIn(store.getState());

	if (isLoggedIn) {
		store.dispatch(setAuthenticated(true));

		// needed to complete the page load
		store.dispatch(setOnloadAuthDetermined());
	} else {
		const googleToken = googleUser.credential;
		const response = await apolloClient.mutate({
			mutation: gql`
                mutation LoginWithGoogle($googleToken: String!) {
                    loginWithGoogle(googleToken: $googleToken) {
                        token
                        refreshToken
                        tokenExpiry
                        success
                        error
                        firstName
                        lastName
                        expiryDate
                        accountType
                        dateCreated
                        email
                        numRowsGenerated
                        profileImage
                        country
                        region
                    }
                }
			`,
			variables: { googleToken }
		});

		if (response.data.loginWithGoogle.success) {
			const { tokenExpiry, refreshToken } = response.data.loginWithGoogle;

			store.dispatch(setAuthenticationData({
				...response.data.loginWithGoogle,
				authMethod: AuthMethod.google
			}));

			Cookies.set('refreshToken', refreshToken, { expires: new Date(tokenExpiry) });
			onLoginSuccess(tokenExpiry, options.onPageRender, store.dispatch);
		} else {
			if (response.data.loginWithGoogle.error === 'accountExpired') {
				addToast({
					type: 'error',
					message: i18n.core.accountExpiredMsg
				});
			} else if (response.data.loginWithGoogle.error === 'noUserAccount') {
				addToast({
					type: 'error',
					message: i18n.core.userAccountNotFound
				});
			}
		}
	}
};

export const SignInWithGoogleButton = (): JSX.Element => {
	const divRef = useRef(null);
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		if (divRef.current && !loaded) {

			// TODO still need to execute something here for scenarios where script takes too long to load.
			setLoaded(true);

			// timeout seems to be needed for the fade-in, perhaps? The DOM element clearly exists at this point but
			// it won't show. Possibly a conflict with whatever google is doing.
			setTimeout(() => {
				if (document.contains(document.getElementById(googleBtnId)) && window.google) {
					window.google.accounts.id.initialize({
						/* eslint-disable @typescript-eslint/camelcase */
						client_id: env.googleAuthClientId,
						callback: onAuthenticated
					});
					window.google.accounts.id.renderButton(
						document.getElementById(googleBtnId),
						{ type: 'standard' }
					);
				}
			}, 500);
		}
	}, [divRef.current]);

	return <div ref={divRef} id={googleBtnId} />;
};

SignInWithGoogleButton.displayName = 'SignInWithGoogleButton';

import React from 'react';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import env from '../../../../_env';
import { apolloClient } from '../../apolloClient';

const googleBtnId = 'google-signin-button';

export const initGoogleAuth = (): void => {
	const meta = document.createElement('meta');
	meta.name = 'google-signin-client_id';
	meta.content = env.googleAuthClientId;
	document.head.appendChild(meta);

	const script = document.createElement('script');
	script.src = 'https://apis.google.com/js/platform.js?onload=renderButton';
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);

	// @ts-ignore-line
	window.renderButton = renderGoogleLoginButton;
};

// note this also fires on page refreshes when the user is already logged in
const onAuthenticated = async (googleUser: any): Promise<any> => {
	// const profile = googleUser.getBasicProfile();
	// console.log('Logged in as: ' + profile.getName());
	// console.log(profile.getImageUrl());

	const googleToken = googleUser.getAuthResponse().id_token;

	const response = await apolloClient.mutate({
		mutation: gql`
            mutation LoginWithGoogle($googleToken: String!) {
                loginWithGoogle(googleToken: $googleToken) {
                    token
                    success,
                    firstName
                }
            }
		`,
		variables: { googleToken }
	});

	//
	if (response.data.loginWithGoogle.success) {
		const { token } = response.data.loginWithGoogle;
		Cookies.set('token', token);

		// store.dispatch(setAuthenticationData('default', firstName));
		// store.dispatch(toggleLoginDialog());
	} else {
		// store.onLoginError();
	}

};

const onFailure = (error: any): void => {
	console.log(error);
};

const renderGoogleLoginButton = (): void => {

	// react can take a little longer to initially render the login panel, so this waits until the btn is available
	// before initializing the button
	const observer = new MutationObserver((): void => {
		if (document.contains(document.getElementById(googleBtnId))) {
			// @ts-ignore-line
			window.gapi.signin2.render(googleBtnId, {
				scope: 'profile email',
				width: 210,
				height: 42,
				longtitle: true,
				theme: 'dark',
				onsuccess: onAuthenticated,
				onfailure: onFailure
			});

			observer.disconnect();
		}
	});

	observer.observe(document, {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	});
};

export const SignInWithGoogleButton = (): JSX.Element => <div id={googleBtnId} />;

export const logoutGoogle = (): void => {
	// @ts-ignore-line
	const auth2 = window.gapi.auth2.getAuthInstance();
	auth2.signOut();
};

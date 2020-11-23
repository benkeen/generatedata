import React from 'react';
import env from '../../../../_env';

const googleBtnId = 'google-signin-button';

export const initGoogleAuth = (): void => {
	const meta = document.createElement('meta');
	meta.name = 'google-signin-client_id';
	meta.content = env.googleAuthClientId;
	document.head.appendChild(meta);

	// <a href={url}><img src="/images/btn_google_signin_dark_normal_web@2x.png" width={191} height={46} /></a>

	// <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>

	const script = document.createElement('script');
	script.src = 'https://apis.google.com/js/platform.js?onload=renderButton';
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);

	// oauth2Client = new google.auth.OAuth2(
	// 	env.googleAuthClientId,
	// 	env.googleAuthClientSecret,
	// 	'http://localhost:9000'
	// );
	//
	// url = oauth2Client.generateAuthUrl({
	// 	// 'online' (default) or 'offline' (gets refresh_token)
	// 	access_type: 'offline',
	//
	// 	// If you only need one scope you can pass it as a string
	// 	scope: []
	// });

	// const scopes = [
	// 	// 'https://www.googleapis.com/auth/blogger',
	// ];

	// @ts-ignore-line
	window.renderButton = renderGoogleLoginButton;
};

// note this also fires on page refreshes when the user is already logged in
const onAuthenticated = (googleUser: any): void => {
	const profile = googleUser.getBasicProfile();

	console.log('Logged in as: ' + profile.getName());
	console.log(profile.getImageUrl());

	const token = googleUser.getAuthResponse().id_token;
	console.log(token);
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

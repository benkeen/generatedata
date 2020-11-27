import env from '../../_env';
import { SignInWithGoogleButton, initGoogleAuth, logoutGoogle } from '../core/auth/google/google';
import { AuthMethod } from '~types/general';

let authToken: string;
let authTokenExpiry: number;

export const setAuthToken = (token: string, tokenExpiry: number) => {
	authToken = token;
	authTokenExpiry = tokenExpiry;

	// start timer
};

export const getAuthToken = () => authToken;

export const initAuthVendors = (): void => {
	if (env.googleAuthClientId) {
		initGoogleAuth();
	}
};

export const hasVendorLogin = (): boolean => {
	if (env.googleAuthClientId) {
		return true;
	}
	return false;
};

export const getVendorLoginButtons = (): React.ReactNode[] => {
	const buttons = [];

	if (env.googleAuthClientId) {
		buttons.push(SignInWithGoogleButton);
	}

	return buttons;
};

export const logoutVendor = (authMethod: AuthMethod): void => {
	if (authMethod === 'google') {
		logoutGoogle();
	}
};

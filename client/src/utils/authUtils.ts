import env from '../../_env';
import { SignInWithGoogleButton, initGoogleAuth, logoutGoogle } from '../core/auth/google/google';
import { AuthMethod } from '~types/general';

let authToken: string;

export const setAuthToken = (token: string, tokenExpiry: number, onRefresh: Function) => {
	authToken = token;

	// refresh the token 1 minute before it expires
	const timeout = setTimeout(() => {
		onRefresh();
		clearTimeout(timeout);
	}, tokenExpiry - 1000);
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

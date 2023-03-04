import env from '../../_env';
import { SignInWithGoogleButton, initGoogleAuth } from '~core/auth/google/google';

// refresh the token 1 minute before it expires
export const setAuthTokenRefresh = (tokenExpiry: number, onRefresh: any): void => {
	const oneMinFromExpiry = (env.jwtDurationMins * 60 * 1000) - (60 * 1000);
	const timeout = setTimeout((): void => {
		clearTimeout(timeout);
		onRefresh();
	}, oneMinFromExpiry);
};

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
	const buttons: any[] = [];

	if (env.googleAuthClientId) {
		buttons.push(SignInWithGoogleButton);
	}

	return buttons;
};

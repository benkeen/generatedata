import env from '../../_env';
import { SignInWithGoogleButton, initGoogleAuth, logoutGoogle } from '../core/auth/google/google';
import { AuthMethod } from '~types/general';


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

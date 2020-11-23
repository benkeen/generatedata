import env from '../../_env';
import { SignInWithGoogleButton, initGoogleAuth, logoutGoogle } from '../core/auth/google/google';
import { AuthMethod } from '~types/general';


export const initAuthVendors = (): void => {
	if (env.googleAuthClientId && env.googleAuthClientSecret) {
		initGoogleAuth();
	}
};

export const hasVendorLogin = (): boolean => {
	if (env.googleAuthClientId && env.googleAuthClientSecret) {
		return true;
	}
	return false;
};

export const getVendorLoginButtons = (): React.ReactNode[] => {
	const buttons = [];

	if (env.googleAuthClientId && env.googleAuthClientSecret) {
		buttons.push(SignInWithGoogleButton);
	}

	return buttons;
};

export const logoutVendor = (authMethod: AuthMethod): void => {
	if (authMethod === 'google') {
		logoutGoogle();
	}
};

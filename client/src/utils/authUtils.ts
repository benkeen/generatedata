import env from '../../_env';
import { SignInWithGoogleButton, initGoogleAuth } from '../core/auth/google/google';


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

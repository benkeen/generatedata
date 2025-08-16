import env from '../../_env';
import { SignInWithGoogleButton, initGoogleAuth } from '~core/auth/google/google';
// refresh the token 1 minute before it expires
export const setAuthTokenRefresh = (tokenExpiry, onRefresh) => {
    const oneMinFromExpiry = (env.jwtDurationMins * 60 * 1000) - (60 * 1000);
    const timeout = setTimeout(() => {
        clearTimeout(timeout);
        onRefresh();
    }, oneMinFromExpiry);
};
export const initAuthVendors = () => {
    if (env.googleAuthClientId) {
        initGoogleAuth();
    }
};
export const hasVendorLogin = () => {
    if (env.googleAuthClientId) {
        return true;
    }
    return false;
};
export const getVendorLoginButtons = () => {
    const buttons = [];
    if (env.googleAuthClientId) {
        buttons.push(SignInWithGoogleButton);
    }
    return buttons;
};
//# sourceMappingURL=authUtils.js.map
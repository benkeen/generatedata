import React, { useRef } from 'react';
import Cookies from 'js-cookie';
import { apolloClient } from '../../apolloClient';
import store from '~store/index';
import { onLoginSuccess, setAuthenticated, setAuthenticationData, setOnloadAuthDetermined } from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';
import { getStrings } from '@generatedata/utils/lang';
import clientConfig from '@generatedata/config/clientConfig';
import { LOGIN_WITH_GOOGLE } from '../../mutations';
import { enqueueSnackbar } from 'notistack';

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
  const i18n = getStrings();

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
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_WITH_GOOGLE,
      variables: { googleToken }
    });

    if (data?.loginWithGoogle?.success) {
      const { tokenExpiry: tokenExpiryStr, refreshToken } = data.loginWithGoogle;
      const tokenExpiry = parseInt(tokenExpiryStr!, 10);

      store.dispatch(
        setAuthenticationData({
          ...data.loginWithGoogle,
          authMethod: 'google'
        })
      );

      Cookies.set('refreshToken', refreshToken!, {
        expires: new Date(tokenExpiry!)
      });

      onLoginSuccess(tokenExpiry!, options.onPageRender, store.dispatch);
    } else {
      if (data?.loginWithGoogle?.error === 'accountExpired') {
        enqueueSnackbar(i18n.core.accountExpiredMsg, { variant: 'error' });
      } else if (data?.loginWithGoogle?.error === 'noUserAccount') {
        enqueueSnackbar(i18n.core.userAccountNotFound, { variant: 'error' });
      }
    }
  }
};

export const SignInWithGoogleButton = () => {
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
            client_id: clientConfig.auth.GD_GOOGLE_AUTH_CLIENT_ID,
            callback: onAuthenticated
          });
          window.google.accounts.id.renderButton(document.getElementById(googleBtnId), { type: 'standard' });
        }
      }, 500);
    }
  }, [divRef.current]);

  return <div ref={divRef} id={googleBtnId} />;
};

SignInWithGoogleButton.displayName = 'SignInWithGoogleButton';

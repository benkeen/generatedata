/* istanbul ignore file */
import { ApolloProvider } from '@apollo/client/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
// import C from '@generatedata/config/constants';
import { useGlobalStyles } from '@generatedata/core';
import { ThemeProvider } from '@mui/material/styles';
import * as codemirror from 'codemirror';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import { apolloClient } from '~core/apolloClient';
import SaveDataSetDialog from '~core/dialogs/saveDataSet/SaveDataSet.container';
import ErrorBoundary from '~core/ErrorBoundary.component';
import Page from '~core/page/Page.container';
import store from '~store/index';
import theme from '~core/theme';
import '~store/generator/generator.reducer';
// import { resetStore } from '~store/main/main.actions';
// import { getAppStateVersion } from '~store/main/main.selectors';
import { getRoutes, updateBodyClass } from '~utils/routeUtils';
import { initApp } from './core';
import { closeSnackbar, SnackbarProvider } from 'notistack';

window.CodeMirror = codemirror;

export const useRouteListener = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateBodyClass(location.pathname));
  }, [location]);
};

// TODO
// const checkState = async (state: any): Promise<any> => {
//   const lastAppStateVersion = getAppStateVersion(state.getState());
//   if (lastAppStateVersion !== C.APP_STATE_VERSION) {
//     await state.dispatch(resetStore());
//   }
// };

const routes = getRoutes();

const LocalizationWrapper = (args: any) => {
  // this rewrites any routes that include a valid (known) lang path root folder so the routing
  // works as expected. Note: the actual loading of the locale file will have taken place prior to here. It either
  // occurs on first boot and <Page> handles waiting to show the whole application until it's ready, or when
  // the user changes is via the lang selector dialog - that alters the URL to include the locale only after it's been
  // successfully loaded
  // if (lang && lang !== 'en' && availableLocalesMap[lang]) {
  const localizedRoutes = routes.map((route) => ({
    ...route,
    path: `/:lang?${route.path}`
  }));

  return (
    <Routes>
      {localizedRoutes.map(({ path, component: Component }, index) => (
        <Route key={index} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

const App = () => {
  useGlobalStyles();
  useRouteListener();

  useEffect(initApp, []);

  return (
    <ErrorBoundary>
      <Page>
        <LocalizationWrapper />
        <SaveDataSetDialog />
      </Page>
    </ErrorBoundary>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackbarProvider
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            classes={{ containerRoot: 'gdToastContainer', root: 'gdToast' }}
            action={(snackbarId) => (
              <IconButton onClick={() => closeSnackbar(snackbarId)}>
                <HighlightOffIcon />
              </IconButton>
            )}
          >
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>
);

export default AppWrapper;

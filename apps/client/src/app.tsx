/* istanbul ignore file */
import { ApolloProvider } from '@apollo/client/react';
import C from '@generatedata/config/constants';
import { Toast, useGlobalStyles } from '@generatedata/core';
import { getLocaleMap } from '@generatedata/utils/lang';
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
import { resetStore } from '~store/main/main.actions';
import { getAppStateVersion } from '~store/main/main.selectors';
import { getRoutes, updateBodyClass } from '~utils/routeUtils';
import { init } from './core';

window.CodeMirror = codemirror;

export const useRouteListener = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateBodyClass(location.pathname));
  }, [location]);
};

const checkState = async (state: any): Promise<any> => {
  const lastAppStateVersion = getAppStateVersion(state.getState());
  if (lastAppStateVersion !== C.APP_STATE_VERSION) {
    await state.dispatch(resetStore());
  }
};

const routes = getRoutes();

// there's probably a cleaner way to do this, but this seems performant and not too complicated
const LocalizationWrapper = (args: any) => {
  const availableLocalesMap = getLocaleMap();
  const lang = args.match?.params?.lang;
  let localizedRoutes = routes;

  // this rewrites any routes that include a valid (known) lang path root folder so the routing
  // works as expected. Note: the actual loading of the locale file will have taken place prior to here. It either
  // occurs on first boot and <Page> handles waiting to show the whole application until it's ready, or when
  // the user changes is via the lang selector dialog - that alters the URL to include the locale only after it's been
  // successfully loaded
  if (lang && lang !== 'en' && availableLocalesMap[lang]) {
    localizedRoutes = routes.map((route) => ({
      ...route,
      path: `/${lang}${route.path}`
    }));
  }

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

  useEffect(() => {
    init();
  }, []);

  // localization wrapp was <Route path="/:lang?">

  return (
    <ErrorBoundary>
      <Page>
        <LocalizationWrapper />
        <Toast />
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
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>
);

export default AppWrapper;

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client';
import fetch from 'cross-fetch';
import store from '~store/index';
import * as mainSelectors from '~store/main/main.selectors';
import { clientConfig } from '@generatedata/config';

// TODO: generalized error handling when logged out
// import { onError } from 'apollo-link-error';
//
// const logoutLink = onError(({ networkError }) => {
// 	if (networkError.statusCode === 401) logout();
// })

const protocol = process.env.GD_WEB_USE_HTTPS === 'true' ? 'https' : 'http';

// Always include the API server port - browser requests go directly to the GraphQL server
const uri = `${protocol}://${clientConfig.webServer.GD_WEB_DOMAIN}:${clientConfig.api.GD_API_SERVER_PORT}/graphql`;

const httpLink = new HttpLink({
  uri,
  fetch,
  credentials: 'include'
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = mainSelectors.getAuthToken(store.getState());

  // TODO
  // console.log('adding token header?', mainSelectors.getAuthToken(store.getState()));

  // this adds the current active jwt token to all requests so the server can authenticate the user
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

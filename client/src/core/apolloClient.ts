import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloLink, HttpLink, concat } from '@apollo/client';
import fetch from 'cross-fetch';
import store from './store';
import * as mainSelectors from './store/main/main.selectors';

// TODO: generalized error handling when logged out
// import { onError } from 'apollo-link-error';
//
// const logoutLink = onError(({ networkError }) => {
// 	if (networkError.statusCode === 401) logout();
// })

const protocol = process.env.GD_WEB_USE_HTTPS === 'true' ? 'https' : 'http';

// this could be improved For prod environments we use the same port and use nginx to route the requests
// to the graphql server
let uri = `${protocol}://${process.env.GD_WEB_DOMAIN}/graphql`;
if (process.env.NODE_ENV === 'development') {
	uri = `${protocol}://${process.env.GD_WEB_DOMAIN}:${process.env.GD_API_SERVER_PORT}/graphql`;
}

const httpLink = new HttpLink({
	uri,
	fetch,
	credentials: 'include'
});

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = mainSelectors.getAuthToken(store.getState());

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


export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	cache: new InMemoryCache()
});

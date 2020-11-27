import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloLink, HttpLink, concat } from '@apollo/client';
import fetch from 'cross-fetch';
import * as authUtils from '~utils/authUtils';

// TODO: generalized error handling when logged out
// import { onError } from 'apollo-link-error';
//
// const logoutLink = onError(({ networkError }) => {
// 	if (networkError.statusCode === 401) logout();
// })

const httpLink = new HttpLink({
	uri: 'http://127.0.0.1:3001/graphql',
	fetch,
	credentials: 'include'
});

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = authUtils.getAuthToken();

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

import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloLink, HttpLink, concat } from '@apollo/client';
import Cookies from 'js-cookie';

// TODO: generalized error handling when logged out
// import { onError } from 'apollo-link-error';
//
// const logoutLink = onError(({ networkError }) => {
// 	if (networkError.statusCode === 401) logout();
// })

const httpLink = new HttpLink({
	uri: 'http://localhost:3001/graphql'
});

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = Cookies.get('token');

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

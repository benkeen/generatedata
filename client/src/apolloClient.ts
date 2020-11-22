import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache()
});

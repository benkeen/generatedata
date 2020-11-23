const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

require('dotenv').config();

const server = new ApolloServer({
	typeDefs,
	resolvers,

	// this seems like a better place for blanket auth checking rather than on a per-resolver level...
	context: ({ req }) => {

		// try to retrieve a user with the token
		// const user = getUser(token);
		//
		// // add the user to the context
		// return { user };

		// provides the auth token to all resolvers
		return {
			token: (req.headers.authorization || '').replace('Bearer ', '')
		};
	}
});

app.get('/oath2callback', (req, res) => {
	console.log(req.query.code);
});

server.applyMiddleware({ app });
app.listen(process.env.GD_API_SERVER_PORT);
console.log('Server started on port ' + process.env.GD_API_SERVER_PORT);

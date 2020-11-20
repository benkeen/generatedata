const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const app = express();
const accounts = require('./database/graphql/accounts');

require('dotenv').config();

const server = new ApolloServer({
	typeDefs: accounts.typeDefs,
	resolvers: accounts.resolvers
});

server.applyMiddleware({ app });

app.get('/api/here', (req, res) => {
});

app.listen(process.env.GD_API_SERVER_PORT);
console.log('Server started on port ' + process.env.GD_API_SERVER_PORT);

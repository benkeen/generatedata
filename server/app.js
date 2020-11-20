const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const app = express();
const schema = require('./database/graphql/schema');
const { ApolloClient } = require('@apollo/client');

require('dotenv').config();

const server = new ApolloServer({
	typeDefs: schema.typeDefs,
	resolvers: schema.resolvers
});

server.applyMiddleware({ app });

app.get('/api/here', (req, res) => {

	const client = new ApolloClient({
		uri: 'http://localhost:3001/graphql'
	});

	/*
	      query TestQuery {
	        launch(id: 56) {
	          id
	          mission {
	            name
	          }
	        }
	      }
	 */

	client.query({
		query: gql`
	    `
	}).then(result => console.log(result));

});

app.listen(process.env.GD_API_SERVER_PORT);
console.log('Server started on port ' + process.env.GD_API_SERVER_PORT);

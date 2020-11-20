const { gql } = require('apollo-server-express');
const db = require('../');

const typeDefs = gql`
    type Query {
        accounts: [Account]
        account(id: ID!): Account
    }
    type Account {
        account_id: ID!
        first_name: String
		last_name: String
		email: String
		password: String
    }
`;

const resolvers = {
	Query: {
		accounts: async () => db.accounts.findAll(),
		account: async (obj, args) => db.accounts.findByPk(args.account_id),
	}
	// Ticket: {
	// 	user: async (obj, args, context, info) => db.users.findByPk(obj.user_id)
	// },
};

module.exports = {
	typeDefs,
	resolvers
};

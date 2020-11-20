const { gql } = require('apollo-server-express');
const db = require('../');

const typeDefs = gql`
    type Query {
        accounts: [Account]
        account(id: ID!): Account
        settings: [Setting]
    }
    type Account {
        account_id: ID!
        date_created: String
        last_updated: String
        last_logged_in: String
        first_name: String
		last_name: String
		email: String
		password: String
    }
    type Setting {
        setting_name: String
        setting_value: String
    }    
`;

const resolvers = {
	Query: {
		accounts: async () => db.accounts.findAll(),
		account: async (obj, args) => db.accounts.findByPk(args.id)
	}
	// Ticket: {
	// 	user: async (obj, args, context, info) => db.users.findByPk(obj.user_id)
	// },
};

module.exports = {
	typeDefs,
	resolvers
};

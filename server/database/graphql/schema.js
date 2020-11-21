const { gql } = require('apollo-server-express');
const db = require('../');
const authHelpers = require('../../utils/auth');

const typeDefs = gql`
    type Query {
        accounts: [Account]
        account(id: ID!): Account
        settings: [Setting]
        configurations: [Configuration]
        configuration(id: ID!): Configuration
    }

	type Mutation {
		login(data: UserLoginInput!): AuthPayLoad!
	}
		
	input UserLoginInput {
		email: String!
		password: String!
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
    type Configuration {
        configuration_id: ID!
		status: ConfigurationStatus
		date_created: String
		account_id: ID
		num_rows_generated: Int
	}
	enum ConfigurationStatus {
		PUBLIC
		PRIVATE	
	}

	type AuthPayLoad {
		token: String!
	}
`;

// https://www.apollographql.com/docs/apollo-server/schema/scalars-enums/#enums

const resolvers = {
	Query: {
		accounts: async () => db.accounts.findAll(),
		account: async (obj, args) => db.accounts.findByPk(args.id)
	},

	Mutation: {
		login: async (root, { data })  => {
			const { email, password } = data;

			const user = await db.accounts.findOne({
				attributes: ['account_id', 'password'],
				where: {
					email
				}
			});

			if (!user) {
				throw new Error('Unable to login');
			}

			const isCorrect = authHelpers.isValidPassword(password, user.password);
			if (!isCorrect) {
				throw new Error('Unable to login');
			}

			const token = await authHelpers.getJwt({
				account_id: user.dataValues.account_id,
				email,
				password: user.dataValues.password
			});

			return {
				token
			};
		}
	}

	// Ticket: {
	// 	user: async (obj, args, context, info) => db.users.findByPk(obj.user_id)
	// },
};

module.exports = {
	typeDefs,
	resolvers
};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        accounts: [Account]
        account(id: ID!): Account
        settings: [Setting]
        configurations: [Configuration]
        configuration(id: ID!): Configuration
    }
	type Mutation {
		login(email: String!, password: String!): AuthPayLoad
        loginWithGoogle(googleToken: String!): AuthPayLoad
        refreshToken: AuthPayLoad
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
        configuration_id: ID
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
		success: Boolean
		token: String
		tokenExpiry: Int
		firstName: String
		error: String
        profileImage: String
	}
`;

module.exports = typeDefs;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        accounts: [Account]
        account: Account
        settings: [Setting]
        configurations: [Configuration]
        configuration(id: ID!): Configuration
    }
	type Mutation {
		login(email: String!, password: String!): AuthPayLoad
        loginWithGoogle(googleToken: String!): AuthPayLoad
        refreshToken: AuthPayLoad
		logout: LogoutPayload
	}
    type Account {
	    accountId: ID
        dateExpires: String
        accountType: AccountType
        dateCreated: String
        firstName: String
		lastName: String
		email: String
        numRowsGenerated: Int
    }
    type Setting {
        settingName: String
        settingValue: String
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
	type LogoutPayload {
		success: Boolean
	}
	enum AccountType {
		user
		admin
	}
`;

module.exports = typeDefs;

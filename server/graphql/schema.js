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
		login(email: String!, password: String!): AuthResponseWithAccount
        loginWithGoogle(googleToken: String!): AuthResponseWithAccount
        refreshToken: AuthResponseWithAccount
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
        profileImage: String
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
    type AuthResponseWithAccount {
        success: Boolean
        token: String
        tokenExpiry: Int
        error: String
        accountId: ID
        dateExpires: String
        accountType: AccountType
        dateCreated: String
        firstName: String
        lastName: String
        email: String
        numRowsGenerated: Int
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

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
		login(email: String!, password: String!): AuthResponse
        loginWithGoogle(googleToken: String!): AuthResponse
        refreshToken: AuthResponse
		logout: GeneralResponse
        updateAccount(firstName: String!, lastName: String!, email: String!, country: String!, region: String): GeneralResponse
		updatePassword(password: String!): GeneralResponse
	}
    type Account {
	    accountId: ID
        dateExpires: String
        accountType: AccountType
        dateCreated: String
        firstName: String
		lastName: String
		email: String
	    country: String
	    region: String
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
    type AuthResponse {
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
	    country: String
	    region: String
        numRowsGenerated: Int
        profileImage: String
    }
	type GeneralResponse {
		success: Boolean
	}
	enum AccountType {
		user
		admin
	}
`;

module.exports = typeDefs;

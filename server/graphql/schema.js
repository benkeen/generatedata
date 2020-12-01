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
		updatePassword(currentPassword: String!, newPassword: String!): GeneralResponse
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
        configurationId: ID
		status: ConfigurationStatus
		dateCreated: String
		accountId: ID
		numRowsGenerated: Int
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
		error: String
	}
	enum AccountType {
		user
		admin
	}
`;

module.exports = typeDefs;

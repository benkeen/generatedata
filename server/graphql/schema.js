const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        accounts: [Account]
        account: Account
        settings: [Setting]
        datasets: [DataSet]
        dataset(id: ID!): DataSet
    }
	type Mutation {
		login(email: String!, password: String!): AuthResponse
        loginWithGoogle(googleToken: String!): AuthResponse
        refreshToken: AuthResponse
		logout: GeneralResponse
        updateAccount(firstName: String!, lastName: String!, email: String!, country: String!, region: String): GeneralResponse
		updatePassword(currentPassword: String!, newPassword: String!): GeneralResponse
        saveNewDataSet(dataSetName: String!, settings: String!): NewDataSetRespnse
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
    type DataSet {
        dataSetId: ID
		status: DataSetStatus
		dateCreated: String
		accountId: ID
		numRowsGenerated: Int
	}
	enum DataSetStatus {
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
    
    type NewDataSetRespnse {
	    success: Boolean
	    error: String
	    dataSetId: ID
    }
	enum AccountType {
		user
		admin
	}
`;

module.exports = typeDefs;

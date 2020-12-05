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
        saveNewDataSet(dataSetName: String!, content: String!): SavedDataSetRespnse
        saveDataSet(dataSetId: ID!, content: String!): SavedDataSetRespnse
		deleteDataSet(dataSetId: ID!): GeneralResponse
	}
    type Account {
	    accountId: ID!
	    createdBy: ID
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
	    dataSetName: String
		status: String
		dateCreated: String
        lastUpdated: String
		accountId: ID
		numRowsGenerated: Int
	    history: [DataSetHistory]
	}
    type DataSetHistory {
        historyId: ID!
	    dataSetId: ID!
	    dateCreated: String
	    content: String
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
    type SavedDataSetRespnse {
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

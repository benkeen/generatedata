const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        accounts: [Account]
        account: Account
        settings: [Setting]
        dataSets: [DataSetListItem]
        dataSet(id: ID!): DataSet
	    dataSetHistory(dataSetId: ID!): DataSetHistory
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
        updateDataSetGenerationCount(dataSetId: ID, generatedRows: Int): GeneralResponse
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
    type DataSetListItem {
        dataSetId: ID
        status: String
        dateCreated: String
        numRowsGenerated: Int
        historyId: ID
        dataSetName: String
        content: String
        dataCreatedUnix: Int
        historyDateCreated: String
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

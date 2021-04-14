const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        accounts(limit: Int, offset: Int, sortCol: String, sortDir: SortDir): AccountsResults
        account: Account
        settings: [Setting]
        dataSets(limit: Int, offset: Int, sortCol: String, sortDir: SortDir): DataSetResults
        dataSet(id: ID!): DataSet
	    dataSetHistory(dataSetId: ID!, limit: Int, offset: Int): DataSetHistoryResults
    }
	type Mutation {
		login(email: String!, password: String!): AuthResponse
        loginWithGoogle(googleToken: String!): AuthResponse
		sendPasswordResetEmail(email: String!): GeneralResponse
        refreshToken: AuthResponse
		logout: GeneralResponse
        updateAccount(accountId: ID!, accountStatus: AccountStatus, firstName: String!, lastName: String!, email: String!,
	        country: String!, region: String, expiryDate: Int): GeneralResponse
        updateCurrentAccount(firstName: String!, lastName: String!, email: String!, country: String!, region: String): GeneralResponse
		updatePassword(currentPassword: String!, newPassword: String!): GeneralResponse
        createUserAccount(firstName: String!, lastName: String!, email: String!, country: String, region: String,
            accountStatus: AccountStatus, expiryDate: Int): GeneralResponse
        deleteAccount(accountId: ID!): GeneralResponse
        saveNewDataSet(dataSetName: String!, content: String!): SavedDataSetResponse
        saveDataSet(dataSetId: ID!, content: String!): SavedDataSetResponse
        renameDataSet(dataSetId: ID!, dataSetName: String): GeneralResponse
		deleteDataSet(dataSetId: ID!): GeneralResponse
        updateDataSetGenerationCount(dataSetId: ID, generatedRows: Int): GeneralResponse
	}
    type Account {
	    accountId: ID!
	    createdBy: ID
        expiryDate: String
        accountType: AccountType
	    accountStatus: AccountStatus
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
        historyDateCreatedUnix: Int
    }
    type DataSetHistoryResults {
        results: [DataSetHistory]
        totalCount: Int
    }
    type DataSetHistory {
        historyId: ID!
        dataSetId: ID!
        dateCreated: String
        content: String
    }
    type DataSetResults {
        results: [DataSetListItem]
	    totalCount: Int
    }
    type AccountsResults {
        results: [Account]
        totalCount: Int
    }
    type AuthResponse {
        success: Boolean
        token: String
        tokenExpiry: String
		refreshToken: String
        error: String
        accountId: ID
        expiryDate: String
        accountType: AccountType
	    accountStatus: AccountStatus
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
    type SavedDataSetResponse {
	    success: Boolean
	    error: String
	    dataSetId: ID
	    savedDate: String
    }
	enum AccountType {
		superuser
        admin
		user
	}
	enum AccountStatus {
		live
		disabled
		expired
	}
	enum SortDir {
		ASC
		DESC
	}
`;

module.exports = typeDefs;

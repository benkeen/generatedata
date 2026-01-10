/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { account as Query_account } from './accounts/resolvers/Query/account';
import    { accounts as Query_accounts } from './accounts/resolvers/Query/accounts';
import    { dataSetHistory as Query_dataSetHistory } from './dataSets/resolvers/Query/dataSetHistory';
import    { dataSets as Query_dataSets } from './dataSets/resolvers/Query/dataSets';
import    { createUserAccount as Mutation_createUserAccount } from './accounts/resolvers/Mutation/createUserAccount';
import    { deleteAccount as Mutation_deleteAccount } from './accounts/resolvers/Mutation/deleteAccount';
import    { deleteDataSet as Mutation_deleteDataSet } from './dataSets/resolvers/Mutation/deleteDataSet';
import    { login as Mutation_login } from './auth/resolvers/Mutation/login';
import    { loginWithGoogle as Mutation_loginWithGoogle } from './auth/resolvers/Mutation/loginWithGoogle';
import    { logout as Mutation_logout } from './auth/resolvers/Mutation/logout';
import    { refreshToken as Mutation_refreshToken } from './auth/resolvers/Mutation/refreshToken';
import    { renameDataSet as Mutation_renameDataSet } from './dataSets/resolvers/Mutation/renameDataSet';
import    { saveDataSet as Mutation_saveDataSet } from './dataSets/resolvers/Mutation/saveDataSet';
import    { saveNewDataSet as Mutation_saveNewDataSet } from './dataSets/resolvers/Mutation/saveNewDataSet';
import    { sendPasswordResetEmail as Mutation_sendPasswordResetEmail } from './auth/resolvers/Mutation/sendPasswordResetEmail';
import    { updateAccount as Mutation_updateAccount } from './accounts/resolvers/Mutation/updateAccount';
import    { updateCurrentAccount as Mutation_updateCurrentAccount } from './accounts/resolvers/Mutation/updateCurrentAccount';
import    { updateDataSetGenerationCount as Mutation_updateDataSetGenerationCount } from './dataSets/resolvers/Mutation/updateDataSetGenerationCount';
import    { updatePassword as Mutation_updatePassword } from './accounts/resolvers/Mutation/updatePassword';
import    { Account } from './accounts/resolvers/Account';
import    { AccountsResults } from './accounts/resolvers/AccountsResults';
import    { AuthResponse } from './auth/resolvers/AuthResponse';
import    { DataSet } from './dataSets/resolvers/DataSet';
import    { DataSetHistory } from './dataSets/resolvers/DataSetHistory';
import    { DataSetHistoryResults } from './dataSets/resolvers/DataSetHistoryResults';
import    { DataSetListItem } from './dataSets/resolvers/DataSetListItem';
import    { DataSetResults } from './dataSets/resolvers/DataSetResults';
import    { GeneralResponse } from './auth/resolvers/GeneralResponse';
import    { SavedDataSetResponse } from './dataSets/resolvers/SavedDataSetResponse';
    export const resolvers: Resolvers = {
      Query: { account: Query_account,accounts: Query_accounts,dataSetHistory: Query_dataSetHistory,dataSets: Query_dataSets },
      Mutation: { createUserAccount: Mutation_createUserAccount,deleteAccount: Mutation_deleteAccount,deleteDataSet: Mutation_deleteDataSet,login: Mutation_login,loginWithGoogle: Mutation_loginWithGoogle,logout: Mutation_logout,refreshToken: Mutation_refreshToken,renameDataSet: Mutation_renameDataSet,saveDataSet: Mutation_saveDataSet,saveNewDataSet: Mutation_saveNewDataSet,sendPasswordResetEmail: Mutation_sendPasswordResetEmail,updateAccount: Mutation_updateAccount,updateCurrentAccount: Mutation_updateCurrentAccount,updateDataSetGenerationCount: Mutation_updateDataSetGenerationCount,updatePassword: Mutation_updatePassword },
      
      Account: Account,
AccountsResults: AccountsResults,
AuthResponse: AuthResponse,
DataSet: DataSet,
DataSetHistory: DataSetHistory,
DataSetHistoryResults: DataSetHistoryResults,
DataSetListItem: DataSetListItem,
DataSetResults: DataSetResults,
GeneralResponse: GeneralResponse,
SavedDataSetResponse: SavedDataSetResponse
    }
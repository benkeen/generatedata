import * as authResolvers from './auth/mutations';
import * as accountResolvers from './accounts/mutations';
import * as dataSetResolvers from './dataSets/queries';
import { type QueryResolvers, type MutationResolvers } from '@generatedata/graphql-schema';

const query: QueryResolvers = {
  dataSets: dataSetResolvers.dataSets,
  dataSetHistory: dataSetResolvers.dataSetHistory
};

const mutation: MutationResolvers = {
  // authentication resolvers
  login: authResolvers.login,
  loginWithGoogle: authResolvers.loginWithGoogle,
  sendPasswordResetEmail: authResolvers.sendPasswordResetEmail,
  refreshToken: authResolvers.checkAndUpdateRefreshToken,
  logout: authResolvers.logout,

  // account-related resolvers
  updateAccount: accountResolvers.updateAccount,
  updateCurrentAccount: accountResolvers.updateCurrentAccount,
  updatePassword: accountResolvers.updatePassword,
  createUserAccount: accountResolvers.createUserAccount,
  deleteAccount: accountResolvers.deleteAccount,

  // data-sets
  saveNewDataSet: dataSetResolvers.saveNewDataSet,
  renameDataSet: dataSetResolvers.renameDataSet,
  saveDataSet: dataSetResolvers.saveDataSet,
  deleteDataSet: dataSetResolvers.deleteDataSet,
  updateDataSetGenerationCount: dataSetResolvers.updateDataSetGenerationCount
};

export default {
  Query: query,
  Mutation: mutation
};

import { Store } from '~types/general';

export const getAccounts = (state: Store): any[] => state.accounts.accounts;

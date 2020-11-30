import { Store } from '~types/general';
import { SelectedAccountTab } from '~types/account';
import { AccountEditingData } from '~store/account/account.reducer';

export const getFirstName = (state: Store): string => state.account.firstName;
export const getNumGeneratedRows = (state: Store): number => state.account.numRowsGenerated;
export const getProfileImage = (state: Store): string | null => state.account.profileImage;
export const getSelectedTab = (state: Store): SelectedAccountTab => state.account.selectedTab;
export const getEditingData = (state: Store): AccountEditingData => state.account.editingData;

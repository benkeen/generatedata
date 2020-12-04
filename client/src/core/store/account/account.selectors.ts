import { Store } from '~types/general';
import { AccountType, SelectedAccountTab } from '~types/account';
import { AccountEditingData } from '~store/account/account.reducer';
import { createSelector } from 'reselect';

export const getFirstName = (state: Store): string => state.account.firstName;
export const getLastName = (state: Store): string => state.account.lastName;
export const getEmail = (state: Store): string => state.account.email;
export const getCountry = (state: Store): string => state.account.country;
export const getRegion = (state: Store): string => state.account.region;
export const getAccountType = (state: Store): AccountType => state.account.accountType;
export const getNumGeneratedRows = (state: Store): number => state.account.numRowsGenerated;
export const getProfileImage = (state: Store): string | null => state.account.profileImage;
export const getSelectedTab = (state: Store): SelectedAccountTab => state.account.selectedTab;
export const getEditingData = (state: Store): AccountEditingData => state.account.editingData;
export const shouldShowSaveDataSetDialog = (state: Store): boolean => state.account.showSaveDataSetDialog;
export const getDataSets = (state: Store): any[] => state.account.dataSets;

export const accountHasChanges = createSelector(
	getFirstName,
	getLastName,
	getEmail,
	getCountry,
	getRegion,
	getEditingData,
	(firstName, lastName, email, country, region, editingData): boolean => (
		firstName !== editingData.firstName ||
		lastName !== editingData.lastName ||
		email !== editingData.email ||
		country !== editingData.country ||
		region !== editingData.region
	)
);

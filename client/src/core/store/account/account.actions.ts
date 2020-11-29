import { SelectedAccountTab } from '~types/account';
import { AccountEditingData } from '~store/account/account.reducer';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const updateAccount = (data: AccountEditingData) => ({
	type: UPDATE_ACCOUNT,
	payload: {
		...data
	}
});

export const CHANGE_ACCOUNT_TAB = 'CHANGE_ACCOUNT_TAB';
export const onChangeTab = (tab: SelectedAccountTab) => ({
	type: CHANGE_ACCOUNT_TAB,
	payload: {
		tab
	}
});

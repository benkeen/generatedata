import { SelectedAccountTab } from '~types/account';
import { AccountEditingData } from '~store/account/account.reducer';
import { GDAction } from '~types/general';

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

export const CANCEL_ACCOUNT_CHANGES = 'CANCEL_ACCOUNT_CHANGES';
export const cancelChanges = (): GDAction => ({ type: CANCEL_ACCOUNT_CHANGES });

export const SAVE_ACCOUNT_CHANGES = 'SAVE_ACCOUNT_CHANGES';
export const saveChanges = (): GDAction => ({ type: CANCEL_ACCOUNT_CHANGES });

export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const savePassword = (password: string): GDAction => ({
	type: SAVE_PASSWORD,
	payload: {
		password
	}
});

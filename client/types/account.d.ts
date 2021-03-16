export type AccountType = 'superuser' | 'admin' | 'user';
export type SelectedAccountTab = 'dataSets' | 'yourAccount' | 'changePassword' | 'other';

export const enum SelectedAccountsTab {
	accounts = 'accounts',
	createAccount = 'createAccount'
}

export const enum AccountStatus {
	live = 'live',
	disabled = 'disabled',
	expired = 'expired'
}

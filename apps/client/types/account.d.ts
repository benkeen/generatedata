export type AccountType = 'superuser' | 'admin' | 'user';
export const enum SelectedAccountTab {
	dataSets = 'dataSets',
	dataSetHistory = 'dataSetHistory',
	yourAccount = 'yourAccount',
	changePassword = 'changePassword',
	other = 'other' // mysterious!
}

export const enum SelectedAccountsTab {
	accounts = 'accounts',
	createAccount = 'createAccount',
	editAccount = 'editAccount'
}

export const enum AccountStatus {
	live = 'live',
	disabled = 'disabled',
	expired = 'expired'
}

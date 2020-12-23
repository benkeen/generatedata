import { accountHasChanges } from '~store/account/account.selectors';
import { cloneObj } from '~utils/generalUtils';

const defaultState: any = {
	account: {
		firstName: 'Pim',
		lastName: 'Buttercup',
		email: 'pim@whatever.net',
		country: 'Mali',
		region: 'Timbuktu',
		editingData: {
			firstName: 'Pim',
			lastName: 'Buttercup',
			email: 'pim@whatever.net',
			country: 'Mali',
			region: 'Timbuktu',
		}
	}
};

describe('accountHasChanges', () => {
	it('returns false when there are no changes', () => {
		expect(accountHasChanges(defaultState)).toEqual(false);
	});

	it('returns true when there are changes #1', () => {
		const state: any = cloneObj(defaultState);
		state.account.editingData.firstName = 'Pimmy';

		expect(accountHasChanges(state)).toEqual(true);
	});

	it('returns true when there are changes #2', () => {
		const state: any = cloneObj(defaultState);
		state.account.editingData.lastName = 'Butter';

		expect(accountHasChanges(state)).toEqual(true);
	});

	it('returns true when there are changes #3', () => {
		const state: any = cloneObj(defaultState);
		state.account.editingData.email = 'different@something.com';

		expect(accountHasChanges(state)).toEqual(true);
	});

	it('returns true when there are changes #4', () => {
		const state: any = cloneObj(defaultState);
		state.account.editingData.country = 'United States';

		expect(accountHasChanges(state)).toEqual(true);
	});

	it('returns true when there are changes #5', () => {
		const state: any = cloneObj(defaultState);
		state.account.editingData.region = 'Another region';

		expect(accountHasChanges(state)).toEqual(true);
	});

});

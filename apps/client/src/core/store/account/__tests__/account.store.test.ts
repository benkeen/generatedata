import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';
import { rootReducer } from '../../../../../tests/testHelpers';
import * as actions from '../account.actions';
import * as selectors from '../account.selectors';
import { LOGOUT, setAuthenticationData } from '~store/main/main.actions';
import { SaveDataDialogType } from '~store/account/account.reducer';
import { AccountStatus, SelectedAccountTab } from '~types/account';
import { AuthMethod } from '~types/general';

describe('accounts section', () => {
	let flushThunks;
	let store: Store;

	beforeEach(() => {
		flushThunks = FlushThunks.createMiddleware();
		store = createStore(rootReducer, applyMiddleware(flushThunks, thunk));
	});

	it('updates an account', () => {
		// check default account info state
		expect(selectors.getFirstName(store.getState())).toEqual('');
		expect(selectors.getLastName(store.getState())).toEqual('');
		expect(selectors.getEmail(store.getState())).toEqual('');
		expect(selectors.getCountry(store.getState())).toEqual('');
		expect(selectors.getRegion(store.getState())).toEqual('');

		store.dispatch(
			actions.updateAccount({
				firstName: 'Tom',
				lastName: 'Jones',
				email: 'tom@jones.net',
				country: 'Canada',
				region: 'British Columbia',
				numRowsGenerated: 100
			})
		);

		// check nothing has been changed in the main state for the user
		expect(selectors.getFirstName(store.getState())).toEqual('');
		expect(selectors.getLastName(store.getState())).toEqual('');
		expect(selectors.getEmail(store.getState())).toEqual('');
		expect(selectors.getCountry(store.getState())).toEqual('');
		expect(selectors.getRegion(store.getState())).toEqual('');

		// now confirm the editing data has been updated
		const editingData = selectors.getEditingData(store.getState());
		expect(editingData.firstName).toEqual('Tom');
		expect(editingData.lastName).toEqual('Jones');
		expect(editingData.email).toEqual('tom@jones.net');
		expect(editingData.country).toEqual('Canada');
		expect(editingData.region).toEqual('British Columbia');
	});

	it('cancelling changes resets back to default values', () => {
		store.dispatch(
			actions.updateAccount({
				firstName: 'Tom',
				lastName: 'Jones',
				email: 'tom@jones.net',
				country: 'Canada',
				region: 'British Columbia',
				numRowsGenerated: 100
			})
		);

		const editingData = selectors.getEditingData(store.getState());
		expect(editingData.firstName).toEqual('Tom');
		expect(editingData.lastName).toEqual('Jones');
		expect(editingData.email).toEqual('tom@jones.net');
		expect(editingData.country).toEqual('Canada');
		expect(editingData.region).toEqual('British Columbia');

		store.dispatch(actions.cancelChanges());

		const newEditingData = selectors.getEditingData(store.getState());
		expect(newEditingData.firstName).toEqual('');
		expect(newEditingData.lastName).toEqual('');
		expect(newEditingData.email).toEqual('');
		expect(newEditingData.country).toEqual('');
		expect(newEditingData.region).toEqual('');
	});

	it('updating the account moves the editing data to the final values', () => {
		store.dispatch(
			actions.updateAccount({
				firstName: 'Tom',
				lastName: 'Jones',
				email: 'tom@jones.net',
				country: 'Canada',
				region: 'British Columbia',
				numRowsGenerated: 100
			})
		);

		expect(selectors.getFirstName(store.getState())).toEqual('');
		expect(selectors.getLastName(store.getState())).toEqual('');
		expect(selectors.getEmail(store.getState())).toEqual('');
		expect(selectors.getCountry(store.getState())).toEqual('');
		expect(selectors.getRegion(store.getState())).toEqual('');

		store.dispatch(actions.yourAccountUpdated());

		expect(selectors.getFirstName(store.getState())).toEqual('Tom');
		expect(selectors.getLastName(store.getState())).toEqual('Jones');
		expect(selectors.getEmail(store.getState())).toEqual('tom@jones.net');
		expect(selectors.getCountry(store.getState())).toEqual('Canada');
		expect(selectors.getRegion(store.getState())).toEqual('British Columbia');
	});

	it('onChangeTab', () => {
		// default selected tab
		expect(selectors.getSelectedTab(store.getState())).toEqual('dataSets');

		// change tabs
		store.dispatch(actions.onChangeTab(SelectedAccountTab.yourAccount));
		expect(selectors.getSelectedTab(store.getState())).toEqual(SelectedAccountTab.yourAccount);

		store.dispatch(actions.onChangeTab(SelectedAccountTab.changePassword));
		expect(selectors.getSelectedTab(store.getState())).toEqual(SelectedAccountTab.changePassword);
	});

	it('save dialog visibility', () => {
		expect(selectors.shouldShowSaveDataSetDialog(store.getState())).toEqual(false);

		store.dispatch(actions.showSaveDataSetDialog(SaveDataDialogType.save));
		expect(selectors.shouldShowSaveDataSetDialog(store.getState())).toEqual(true);

		store.dispatch(actions.hideSaveDataSetDialog());
		expect(selectors.shouldShowSaveDataSetDialog(store.getState())).toEqual(false);
	});

	it('auth data gets set', () => {
		store.dispatch(
			setAuthenticationData({
				authMethod: AuthMethod.google,
				token: '123456',
				accountId: 5,
				firstName: 'Jim',
				lastName: 'Beam',
				email: 'jim@beam.net',
				country: 'United States',
				region: 'Montana',
				profileImage: 'image-here.jpg',
				expiryDate: '1000010101001',
				dateCreated: '1000010101001',
				accountType: 'admin',
				accountStatus: AccountStatus.live,
				numRowsGenerated: 50000
			})
		);

		expect(selectors.getFirstName(store.getState())).toEqual('Jim');
		expect(selectors.getLastName(store.getState())).toEqual('Beam');
		expect(selectors.getEmail(store.getState())).toEqual('jim@beam.net');
		expect(selectors.getCountry(store.getState())).toEqual('United States');
		expect(selectors.getRegion(store.getState())).toEqual('Montana');
		expect(selectors.getProfileImage(store.getState())).toEqual('image-here.jpg');
		expect(selectors.getAccountType(store.getState())).toEqual('admin');
		expect(selectors.getNumGeneratedRows(store.getState())).toEqual(50000);
	});

	it('logging out clears the pertinent account info', () => {
		store.dispatch(
			actions.updateAccount({
				firstName: 'Tom',
				lastName: 'Jones',
				email: 'tom@jones.net',
				country: 'Canada',
				region: 'British Columbia',
				numRowsGenerated: 100
			})
		);

		store.dispatch({ type: LOGOUT });

		expect(selectors.getFirstName(store.getState())).toEqual('');
		expect(selectors.getLastName(store.getState())).toEqual('');
		expect(selectors.getEmail(store.getState())).toEqual('');
		expect(selectors.getCountry(store.getState())).toEqual('');
		expect(selectors.getRegion(store.getState())).toEqual('');
	});
});

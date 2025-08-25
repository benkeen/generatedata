import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SaveDataSetDialog, { SaveDataSetDialogProps } from './SaveDataSet.component';
import * as selectors from '~store/generator/generator.selectors';
import * as accountSelectors from '~store/account/account.selectors';
import * as actions from '~store/account/account.actions';
import * as mainActions from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';
import clientConfig from '@generatedata/config/clientConfig';

const mapStateToProps = (
	state: any
): Pick<SaveDataSetDialogProps, 'i18n' | 'visible' | 'isLoggedIn' | 'dialogType' | 'showRegistration'> => ({
	i18n: selectors.getCoreI18n(state),
	visible: accountSelectors.shouldShowSaveDataSetDialog(state),
	isLoggedIn: mainSelectors.isLoggedIn(state),
	dialogType: accountSelectors.getSaveDataDialogType(state),

	// TODO. We should offer an option for users to register themselves and not rely on the admin to do it for them
	showRegistration: clientConfig.appSettings.GD_APP_TYPE === 'prod'
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<SaveDataSetDialogProps, 'onClose' | 'onRedirectToLogin' | 'onSave'> => ({
	onClose: (): any => dispatch(actions.hideSaveDataSetDialog()),
	onRedirectToLogin: (): any => {
		dispatch(actions.hideSaveDataSetDialog());
		dispatch(mainActions.setLoginDialogVisibility(true));

		// this returns them to the save dialog after logging in
		mainActions.setReturnToSaveDataSet();
	},
	onSave: (dataSetName: string): any => dispatch(actions.saveNewDataSet(dataSetName))
});

const container: any = connect(mapStateToProps, mapDispatchToProps)(SaveDataSetDialog);

export default container;

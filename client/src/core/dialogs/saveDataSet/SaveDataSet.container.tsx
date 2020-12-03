import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SaveDataSetDialog, { SaveDataSetDialogProps } from './SaveDataSet.component';
import * as selectors from '~store/generator/generator.selectors';
import * as accountSelectors from '~store/account/account.selectors';
import * as actions from '~store/account/account.actions';
import * as mainActions from '~store/main/main.actions';
import * as mainSelectors from '~store/main/main.selectors';


const mapStateToProps = (state: any): Partial<SaveDataSetDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	visible: accountSelectors.shouldShowSaveDataSetDialog(state),
	isLoggedIn: mainSelectors.isLoggedIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<SaveDataSetDialogProps> => ({
	onClose: (): any => dispatch(actions.hideSaveDataSetDialog()),
	onRedirectToLogin: (): any => {
		dispatch(actions.hideSaveDataSetDialog());
		dispatch(mainActions.setLoginDialogVisibility(true));

		// this returns them to the save dialog after logging in
		mainActions.setReturnToSaveDataSet();
	},
	onSave: (dataSetName: string): any => dispatch(actions.saveNewDataSet(dataSetName)),
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(SaveDataSetDialog);

export default container;

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import GeneratorControls, { GeneratorControlsProps } from './GeneratorControls.component';
import * as selectors from '../store/generator/generator.selectors';
import * as generatorActions from '~store/generator/generator.actions';
import * as actions from '~store/account/account.actions';
import * as mainSelectors from '~store/main/main.selectors';
import { SaveDataDialogType } from '~store/account/account.reducer';
import { ClearPageType } from '~core/dialogs/clearPage/ClearPage.component';

const mapStateToProps = (state: any): Partial<GeneratorControlsProps> => ({
	i18n: selectors.getCoreI18n(state),
	isLoggedIn: mainSelectors.isLoggedIn(state),
	dataSetName: selectors.getCurrentDataSetName(state),
	dataSetId: selectors.getCurrentDataSetId(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GeneratorControlsProps> => ({
	onUpdate: (dataSetName: string): any => dispatch(actions.renameDataSet(dataSetName)),
	onSaveDataSet: (): any => dispatch(actions.showSaveDataSetDialog(SaveDataDialogType.save)),
	onSaveAs: (): any => dispatch(actions.showSaveDataSetDialog(SaveDataDialogType.saveAs)),
	onClearGrid: (): any => dispatch(generatorActions.clearPage(ClearPageType.dataOnly)),
	showClearPageDialog: (): any => dispatch(generatorActions.showClearPageDialog()),
	onShowHistory: (): any => {
		dispatch(generatorActions.stashGeneratorState());
		dispatch(generatorActions.showDataSetHistory());
	}
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(GeneratorControls);

export default container;

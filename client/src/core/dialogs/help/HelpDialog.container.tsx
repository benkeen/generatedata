import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as selectors from '~store/generator/generator.selectors';
import * as actions from '~store/generator/generator.actions';
import HelpDialog, { HelpDialogProps } from './HelpDialog.component';
import { DataTypeFolder } from '../../../../_plugins';

const mapStateToProps = (state: any): Partial<HelpDialogProps> => ({
	visible: selectors.isHelpDialogVisible(state),
	coreI18n: selectors.getCoreI18n(state),
	dataTypeI18n: selectors.getDataTypeI18n(state),
	initialDataType: selectors.getHelpDialogSection(state),
	loadedDataTypes: selectors.getLoadedDataTypes(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HelpDialogProps> => ({
	onClose: (): any => dispatch(actions.hideHelpDialog()),
	onSelectDataType: (dataType: DataTypeFolder): any => dispatch(actions.onSelectDataType(dataType))
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(HelpDialog);

export default container;

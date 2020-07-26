import { connect } from 'react-redux';
import CodeMirrorWrapper from './CodeMirrorWrapper.component';
import * as selectors from '../store/generator/generator.selectors';

const mapStateToProps = (state: any): any => {
	return {
		columns: selectors.getColumns(state),
		rowDataTypes: selectors.getRowDataTypes(state),
		numPreviewRows: selectors.getNumPreviewRows(state),
		showRowNumbers: selectors.shouldShowRowNumbers(state),
		enableLineWrapping: selectors.shouldEnableLineWrapping(state),
		theme: selectors.getTheme(state),
		codeMirrorMode: selectors.getCodeMirrorMode(state),
		exportType: selectors.getExportType(state),
		exportTypeSettings: selectors.getExportTypeSettings(state),
		loadedExportTypes: selectors.getLoadedExportTypes(state)
	};
};

export default connect(
	mapStateToProps,
)(CodeMirrorWrapper);

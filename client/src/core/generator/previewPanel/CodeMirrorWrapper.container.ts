import { connect } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';
import { Store } from '~types/general';
import CodeMirrorWrapper, { CodeMirrorWrapperProps } from './CodeMirrorWrapper.component';

const mapStateToProps = (state: Store): CodeMirrorWrapperProps => ({
	previewRows: selectors.getPreviewRows(state),
	columns: selectors.getColumns(state),
	showLineNumbers: selectors.shouldShowLineNumbers(state),
	enableLineWrapping: selectors.shouldEnableLineWrapping(state),
	theme: selectors.getTheme(state),
	codeMirrorMode: selectors.getCodeMirrorMode(state),
	exportType: selectors.getExportType(state),
	exportTypeSettings: selectors.getExportTypeSettings(state),
	loadedExportTypes: selectors.getLoadedExportTypes(state)
});

export default connect(
	mapStateToProps,
)(CodeMirrorWrapper);

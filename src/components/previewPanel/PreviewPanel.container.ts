import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel, { PreviewPanelProps } from './PreviewPanel.component';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PreviewPanelProps> => {
	const exportType = selectors.getExportType(state);
	const settings = selectors.getExportTypeSettings(state);
	const exportTypeSettings = (settings[exportType]) ? settings[exportType] : {};

	return {
		ExportTypePreview: selectors.getExportTypePreviewComponent(state),
		i18n: selectors.getCoreI18n(state),

		exportSettingsVisible: selectors.shouldShowExportSettings(state),
		numPreviewRows: selectors.getNumPreviewRows(state),
		builderLayout: selectors.getBuilderLayout(state),
		previewTextSize: selectors.getPreviewTextSize(state),
		showRowNumbers: selectors.shouldShowRowNumbers(state),
		enableLineWrapping: selectors.shouldEnableLineWrapping(state),
		theme: selectors.getTheme(state),
		exportTypeLabel: selectors.getExportType(state),
		exportTypeSettings,

		// this'll need to change. It returns a fresh object on every keystroke, even if it was the same. That
		// causes the preview panel to do a (slow) repaint every time
		data: selectors.getPreviewPanelData(state)
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelProps> => ({
	togglePreview: (): any => dispatch(actions.togglePreview()),
	refreshPreview: (): any => dispatch(actions.refreshPreview()),
	toggleExportSettings: (): any => dispatch(actions.toggleExportSettings('previewPanel'))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanel);

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel, { PreviewPanelProps } from './PreviewPanel.component';
import * as initSelectors from '../../core/init/init.selectors';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any): Partial<PreviewPanelProps> => {
	return {
		i18n: initSelectors.getCoreI18n(state),
		numPreviewRows: selectors.getNumPreviewRows(state),
		builderLayout: selectors.getBuilderLayout(state),
		previewTextSize: selectors.getPreviewTextSize(state),
		exportTypeSettings: {},
		showRowNumbers: selectors.shouldShowRowNumbers(state),
		enableLineWrapping: selectors.shouldEnableLineWrapping(state),
		theme: selectors.getTheme(state),

		// this'll need to change. It returns a fresh object on every keystroke, even if it was the same. That
		// causes the preview panel to do a (slow) repaint every time
		data: selectors.getPreviewPanelData(state)
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelProps> => ({
	togglePreview: (): any => dispatch(actions.togglePreview()),
	refreshPreview: (): any => dispatch(actions.refreshPreview()),
	toggleExportSettings: (): any => dispatch(actions.toggleExportSettings())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanel);

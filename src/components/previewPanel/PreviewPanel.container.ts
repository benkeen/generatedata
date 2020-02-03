import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel, { PreviewPanelProps } from './PreviewPanel.component';
import * as selectors from '../../core/generator/generator.selectors';
import * as actions from '../../core/generator/generator.actions';
import { generateExportData } from '../../core/generator/generator';

const mapStateToProps = (state: any): Partial<PreviewPanelProps> => {
	const data = { 
		isFirstBatch: true,
		isLastBatch: true,
		columnTitles: selectors.getColumnTitles(state),
		rows: selectors.getPreviewData(state)
	};

	return {
		numPreviewRows: selectors.getNumPreviewRows(state),
		builderLayout: selectors.getBuilderLayout(state),
		previewTextSize: selectors.getPreviewTextSize(state),
		exportTypeSettings: {},
		showRowNumbers: selectors.shouldShowRowNumbers(state),
		enableLineWrapping: selectors.shouldEnableLineWrapping(state),
		theme: selectors.getTheme(state),
		data
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelProps> => ({
	togglePreview: (): any => dispatch(actions.togglePreview())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanel);

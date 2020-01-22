import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel, { PreviewPanelProps } from './PreviewPanel.component';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';
import { generateExportData } from '../../core/generator/generator';

const mapStateToProps = (state: any): Partial<PreviewPanelProps> => {
	const numPreviewRows = generatorSelectors.getNumPreviewRows(state);
	return {
		numPreviewRows,
		builderLayout: generatorSelectors.getBuilderLayout(state),
		exportTypeSettings: {},
		showRowNumbers: generatorSelectors.shouldShowRowNumbers(state),
		theme: generatorSelectors.getTheme(state),
		data: generateExportData({
			numResults: numPreviewRows,
			columnTitles: generatorSelectors.getColumnTitles(state),
			template: generatorSelectors.getGenerationTemplate(state)
		})
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelProps> => ({
	toggleLayout: (): any => dispatch(generatorActions.toggleLayout()),
	togglePreview: (): any => dispatch(generatorActions.togglePreview()),
	updateNumPreviewRows: (numRows: number): any => dispatch(generatorActions.updateNumPreviewRows(numRows))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanel);

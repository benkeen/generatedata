import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel, { PreviewPanelProps } from './PreviewPanel.component';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';
import { generateExportData } from '../../core/generator/generator';

const mapStateToProps = (state: any): Partial<PreviewPanelProps> => {
	const numPreviewRows = generatorSelectors.getNumPreviewRows(state);

	// this has to be smarter. It should only regenerate data for SPECIFIC rows that change, and not the column title
	// column. How about simply regenerate it on demand?

	const data = generateExportData({
		numResults: numPreviewRows,
		columnTitles: generatorSelectors.getColumnTitles(state),
		template: generatorSelectors.getGenerationTemplate(state)
	});

	/*
	{
		"isFirstBatch": true,
		"isLastBatch": true,
		"columnTitles": [
		  "Namesss",
		  "another name",
		  "Phone Nmber "
		],
		"rows": [
		  [
			"Iola Ewing",
			"Karly Rocha",
			"1-134-444-8215",
		  ],
		  [
			"Connor Marks",
			"Josiah Elliott",
			"1-687-601-3536",
		  ],
		  [
			"Laith Diaz",
			"Whilemina Jordan",
			"1-167-522-4637",
		  ],
		  [
			"Kellie Kirkland",
			"Laura Haynes",
			"1-648-747-5294",
		  ],
		  [
			"Herman Campbell",
			"Denise Stanley",
			"1-633-953-8360",
		  ]
		]
	  }
	  */

	return {
		numPreviewRows,
		builderLayout: generatorSelectors.getBuilderLayout(state),
		previewTextSize: generatorSelectors.getPreviewTextSize(state),
		exportTypeSettings: {},
		showRowNumbers: generatorSelectors.shouldShowRowNumbers(state),
		enableLineWrapping: generatorSelectors.shouldEnableLineWrapping(state),
		theme: generatorSelectors.getTheme(state),
		data
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<PreviewPanelProps> => ({
	togglePreview: (): any => dispatch(generatorActions.togglePreview())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps

// @ts-ignore
)(PreviewPanel);

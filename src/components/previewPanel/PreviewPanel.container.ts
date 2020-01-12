import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel from './PreviewPanel.component';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';
import { generateExportData } from '../../core/generator/generator';

const mapStateToProps = (state: any) => {
    const numPreviewRows = generatorSelectors.getNumPreviewRows(state);
    return {
        numPreviewRows,
        builderLayout: generatorSelectors.getBuilderLayout(state),
        exportTypeSettings: {},
        data: generateExportData({
            numResults: numPreviewRows,
            columnTitles: generatorSelectors.getColumnTitles(state),
            template: generatorSelectors.getGenerationTemplate(state)
        })
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleLayout: () => dispatch(generatorActions.toggleLayout()),
    togglePreview: () => dispatch(generatorActions.togglePreview()),
    updateNumPreviewRows: (numRows: number) => dispatch(generatorActions.updateNumPreviewRows(numRows))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PreviewPanel);


import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewPanel from './PreviewPanel.component';
import * as generatorSelectors from '../../core/generator/generator.selectors';
import * as generatorActions from '../../core/generator/generator.actions';

const mapStateToProps = (state: any) => ({
    numPreviewRows: generatorSelectors.getNumPreviewRows(state),
    builderLayout: generatorSelectors.getBuilderLayout(state),
    generationTemplate: generatorSelectors.getGenerationTemplate(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleLayout: () => dispatch(generatorActions.toggleLayout()),
    togglePreview: () => dispatch(generatorActions.togglePreview()),
    updateNumPreviewRows: (numRows: number) => dispatch(generatorActions.updateNumPreviewRows(numRows))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PreviewPanel);


import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/generator/generator.actions';
import * as selectors from '../store/generator/generator.selectors';
import GenerationPanel, { GenerationPanelProps } from './GenerationPanel.component';

const mapStateToProps = (state: any, ownProps: Partial<GenerationPanelProps>): Partial<GenerationPanelProps> => ({
	visible: selectors.isGenerationPanelVisible(state),
	i18n: selectors.getCoreI18n(state),
	numRowsToGenerate: selectors.getNumRowsToGenerate(state),
	isGenerating: selectors.isGenerating(state),
	numGeneratedRows: selectors.getNumGeneratedRows(state),
	...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GenerationPanelProps> => ({
	onClose: (): any => {
		dispatch(actions.cancelGeneration());
		dispatch(actions.hideGenerationPanel());
	},
	onChangeNumRowsToGenerate: (numRows: number): any => dispatch(actions.updateNumRowsToGenerate(numRows)),
	onToggleStripWhitespace: () => dispatch(actions.toggleStripWhitespace()),
	onGenerate: () => dispatch(actions.startGeneration())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GenerationPanel);

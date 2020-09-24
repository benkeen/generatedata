import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/generator/generator.actions';
import * as selectors from '../store/generator/generator.selectors';
import * as dataSelectors from '../store/data/data.selectors';
import GenerationPanel, { GenerationPanelProps } from './ActivityPanel.component';

const mapStateToProps = (state: any, ownProps: Partial<GenerationPanelProps>): Partial<GenerationPanelProps> => ({
	visible: dataSelectors.isGenerating(state),
	i18n: selectors.getCoreI18n(state),
	numRowsToGenerate: selectors.getNumRowsToGenerate(state),
	numGeneratedRows: selectors.getNumGeneratedRows(state),
	...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GenerationPanelProps> => ({
	onClose: (): any => {
		dispatch(actions.cancelGeneration());
		dispatch(actions.hideGenerationPanel());
	},
	onPause: () => {},
	onContinue: () => {},
	onCcan
	onChangeNumRowsToGenerate: (numRows: number): Action => dispatch(actions.updateNumRowsToGenerate(numRows)),
	onToggleStripWhitespace: (): Action => dispatch(actions.toggleStripWhitespace()),
	onGenerate: (): Action => dispatch(actions.startGeneration())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GenerationPanel);

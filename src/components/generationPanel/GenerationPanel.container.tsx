import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../core/generator/generator.actions';
import * as selectors from '../../core/generator/generator.selectors';
import GenerationPanel, { GenerationPanelProps } from './GenerationPanel.component';

const mapStateToProps = (state: any, ownProps: Partial<GenerationPanelProps>): Partial<GenerationPanelProps> => ({
	visible: selectors.isGenerationPanelVisible(state),
	i18n: selectors.getCoreI18n(state),
	numGenerationRows: selectors.getNumGenerationRows(state),
	...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GenerationPanelProps> => ({
	onClose: (): any => dispatch(actions.hideGenerationPanel()),
	onChangeNumGenerationRows: (numRows: number): any => dispatch(actions.updateNumGenerationRows(numRows)),
	onToggleStripWhitespace: () => dispatch(actions.toggleStripWhitespace()),
	onGenerate: () => dispatch(actions.generateData())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GenerationPanel);

import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/generator/generator.actions';
import * as selectors from '../store/generator/generator.selectors';
import GenerationSettings, { GenerationSettingsProps } from './GenerationSettings.component';

const mapStateToProps = (state: any, ownProps: Partial<GenerationSettingsProps>): Partial<GenerationSettingsProps> => ({
	visible: selectors.isStartGenerationPanelVisible(state),
	i18n: selectors.getCoreI18n(state),
	numRowsToGenerate: selectors.getNumRowsToGenerate(state),
	...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GenerationSettingsProps> => ({
	onClose: (): any => {
		dispatch(actions.cancelGeneration());
		dispatch(actions.hideGenerationPanel());
	},
	onChangeNumRowsToGenerate: (numRows: number): Action => dispatch(actions.updateNumRowsToGenerate(numRows)),
	onToggleStripWhitespace: (): Action => dispatch(actions.toggleStripWhitespace()),
	onGenerate: (): Action => dispatch(actions.startGeneration())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GenerationSettings);

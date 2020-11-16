import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/generator/generator.actions';
import * as packetActions from '../store/packets/packets.actions';
import * as selectors from '../store/generator/generator.selectors';
import GenerationSettings, { GenerationSettingsProps } from './GenerationSettings.component';

const mapStateToProps = (state: any, ownProps: Partial<GenerationSettingsProps>): Partial<GenerationSettingsProps> => ({
	visible: selectors.isGenerationSettingsPanelVisible(state),
	i18n: selectors.getCoreI18n(state),
	numRowsToGenerate: selectors.getNumRowsToGenerate(state),
	stripWhitespace: selectors.shouldStripWhitespace(state),
	...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<GenerationSettingsProps> => ({
	onClose: (): Action => dispatch(actions.hideStartGenerationPanel()),
	onChangeNumRowsToGenerate: (numRows: number): Action => dispatch(actions.updateNumRowsToGenerate(numRows)),
	onToggleStripWhitespace: (): Action => dispatch(actions.toggleStripWhitespace()),
	onGenerate: (): Action => dispatch(packetActions.startGeneration())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GenerationSettings);

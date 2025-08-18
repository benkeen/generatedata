import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/generator/generator.actions';
import * as packetActions from '../store/packets/packets.actions';
import * as selectors from '../store/generator/generator.selectors';
import GenerationSettings, { GenerationSettingsProps } from './GenerationSettings.component';
import C from '@generatedata/config/dist/constants';
import * as packetSelectors from '~store/packets/packets.selectors';
import { GDAction } from '~types/general';
import { isLoggedIn } from '~store/main/main.selectors';

const mapStateToProps = (state: any, ownProps: Partial<GenerationSettingsProps>): Partial<GenerationSettingsProps> => {
	const packet = packetSelectors.getCurrentPacket(state);
	const largePacketSize = !!packet && packet.config.numRowsToGenerate > C.SMALL_GENERATION_COUNT;

	return {
		packet,
		visible: selectors.isGenerationSettingsPanelVisible(state),
		isLoggedIn: isLoggedIn(state),
		isGenerating: !largePacketSize && packetSelectors.isGenerating(state),
		i18n: selectors.getCoreI18n(state),
		numRowsToGenerate: selectors.getNumRowsToGenerate(state),
		stripWhitespace: selectors.shouldStripWhitespace(state),
		...ownProps
	};
};

const mapDispatchToProps = (dispatch: Dispatch): { dispatch: any } => ({
	dispatch
});

const mergeProps = ({ packetId, ...stateProps }: any, { dispatch }: any): GenerationSettingsProps => {
	const props = {
		...stateProps,
		onClose: (): Action => dispatch(actions.hideStartGenerationPanel()),
		onChangeNumRowsToGenerate: (numRows: number): Action => dispatch(actions.updateNumRowsToGenerate(numRows)),
		onToggleStripWhitespace: (): Action => dispatch(actions.toggleStripWhitespace()),
		onGenerate: (): Action => dispatch(packetActions.startGeneration())
	};

	if (stateProps.packet === null) {
		return props;
	}

	return {
		...props,
		onAbort: (): GDAction => dispatch(packetActions.abortGeneration(packetId)),
		onDownload: (): any => dispatch(packetActions.promptToDownload())
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GenerationSettings);

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getGenerationActivityPanel } from '~core/generationPanel/generation.helpers';
import { GDAction, GenerationActivityPanel } from '~types/general';
import * as selectors from '../store/generator/generator.selectors';
import * as packetActions from '../store/packets/packets.actions';
import * as packetSelectors from '../store/packets/packets.selectors';
import ActivityPanel, { ActivityPanelProps } from './ActivityPanel.component';

const mapStateToProps = (state: any): Partial<ActivityPanelProps> & { packetId: string | null } => {
  const packet = packetSelectors.getCurrentPacket(state);
  const largePacketSize = !!packet && getGenerationActivityPanel(packet.config.numRowsToGenerate) === GenerationActivityPanel.large;

  const props: Partial<ActivityPanelProps> & { packetId: string | null } = {
    visible: largePacketSize && packetSelectors.isGenerating(state),
    fullI18n: selectors.getI18n(state),
    packet,
    packetId: packetSelectors.getCurrentPacketId(state),
    batchLoadTimes: packetSelectors.getBatchLoadTimes(state),
    dataSize: packetSelectors.getGeneratedDataSizeLabel(state),
    estimatedSize: packetSelectors.getEstimatedDataSize(state),
    estimatedTime: packetSelectors.getEstimatedTimeDisplay(state),
    estimatedTimeRemaining: packetSelectors.getEstimatedTimeRemaining(state),
    countUpSpeed: packetSelectors.getLastBatchGenerationDuration(state)
  };

  if (packet !== null) {
    props.loadTimeGraphDuration = packetSelectors.getLoadTimeDuration(state);
  }

  return props;
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({ dispatch });

const mergeProps = ({ packetId, ...stateProps }: any, { dispatch }: any): ActivityPanelProps => {
  if (stateProps.packet === null) {
    return stateProps;
  }

  return {
    ...stateProps,
    onClose: (): void => dispatch(packetActions.hideActivityPanel()),
    onPause: (): GDAction => dispatch(packetActions.pauseGeneration(packetId)),
    onContinue: (): GDAction => dispatch(packetActions.continueGeneration(packetId)),
    onAbort: (): GDAction => dispatch(packetActions.abortGeneration(packetId)),
    onDownload: (): any => dispatch(packetActions.promptToDownload()),
    onChangeSpeed: (speed: number): any => dispatch(packetActions.changeSpeed(speed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ActivityPanel);

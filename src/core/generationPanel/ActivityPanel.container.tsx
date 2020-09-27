import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as packetActions from '../store/packets/packets.actions';
import * as selectors from '../store/generator/generator.selectors';
import * as packetSelectors from '../store/packets/packets.selectors';
import ActivityPanel, { ActivityPanelProps } from './ActivityPanel.component';
import * as coreUtils from '~utils/coreUtils';
import { GDAction } from '~types/general';

const mapStateToProps = (state: any): Partial<ActivityPanelProps> & { packetId: string | null } => {
	const packet = packetSelectors.getCurrentPacket(state);

	let workerResources = {};
	if (packet !== null) {
		workerResources = {
			workerUtils: coreUtils.getWorkerUtils(),
			exportTypes: coreUtils.getExportTypeWorkerMap(selectors.getLoadedExportTypes(state)),
			dataTypes: coreUtils.getDataTypeWorkerMap(packet.config.dataTypes),
			countries: coreUtils.getCountries()
		};
	}

	return {
		visible: packetSelectors.isGenerating(state),
		i18n: selectors.getCoreI18n(state),
		packet,
		packetId: packetSelectors.getCurrentPacketId(state),
		batchLoadTimes: packetSelectors.getBatchLoadTimes(state),
		workerResources
	};
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({ dispatch });

const mergeProps = ({ packetId, ...stateProps }: any, { dispatch }: any): ActivityPanelProps => {
	if (stateProps.packet === null) {
		return stateProps;
	}

	return {
		...stateProps,
		onClose: (): void => dispatch(packetActions.hideActivityPanel()),
		logDataBatch: (numGenRows: number, dataStr: string): GDAction => dispatch(packetActions.logDataBatch(packetId, numGenRows, dataStr)),
		onPause: (): GDAction => dispatch(packetActions.pauseGeneration(packetId)),
		onContinue: (): GDAction => dispatch(packetActions.continueGeneration(packetId)),
		onAbort: (): GDAction => dispatch(packetActions.abortGeneration(packetId)),
		onDownload: (): any => dispatch(packetActions.promptToDownload()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ActivityPanel);

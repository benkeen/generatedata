import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/generator/generator.actions';
import * as packetActions from '../store/packets/packets.actions';
import * as selectors from '../store/generator/generator.selectors';
import * as packetSelectors from '../store/packets/packets.selectors';
import ActivityPanel, { ActivityPanelProps } from './ActivityPanel.component';
import * as coreUtils from '~utils/coreUtils';

const mapStateToProps = (state: any): Partial<ActivityPanelProps> => {
	const packet = packetSelectors.getVisiblePacket(state);

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
		packetId: packetSelectors.getVisiblePacketId(state),
		batchLoadTimes: packetSelectors.getBatchLoadTimes(state),
		workerResources
	};
};


const mapDispatchToProps = (dispatch: Dispatch): Partial<ActivityPanelProps> => ({
	onClose: (): void => {
		dispatch(actions.hideGenerationPanel());
	},
	logDataBatch: (packetId: string, numGeneratedRows: number, data: any) => dispatch(packetActions.logDataBatch(packetId, numGeneratedRows, data)),
	onPause: (): void => {},
	onContinue: (): void => {},
	onAbort: (): void => {}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivityPanel);

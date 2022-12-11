import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as packetActions from '../store/packets/packets.actions';
import * as selectors from '../store/generator/generator.selectors';
import * as packetSelectors from '../store/packets/packets.selectors';
import Engine, { EngineProps } from './Engine.component';
import * as coreUtils from '~utils/coreUtils';
import { GDAction } from '~types/general';
import { getCountryData } from '~utils/countryUtils';

const mapStateToProps = (state: any): Partial<EngineProps> & { packetId: any } => {
	const packet = packetSelectors.getCurrentPacket(state);
	const packetId = packetSelectors.getCurrentPacketId(state);

	const props: Partial<EngineProps> & { packetId: any } = {
		packetId,
		fullI18n: selectors.getI18n(state),
		packet,
		countryNames: coreUtils.getCountryNames()
	};

	if (packet !== null) {
		props.workerUtilsUrl = coreUtils.getWorkerUtilsUrl();
		props.exportTypeWorkerMap = coreUtils.getExportTypeWorkerMap(selectors.getLoadedExportTypes(state));
		props.dataTypeWorkerMap = coreUtils.getDataTypeWorkerMap(packet.config.dataTypes);
		props.countryData = getCountryData();
	}

	return props;
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({ dispatch });

const mergeProps = ({ packetId, ...stateProps }: any, { dispatch }: any): EngineProps => {
	if (stateProps.packet === null) {
		return stateProps;
	}

	return {
		...stateProps,
		logDataBatch: (numGenRows: number, dataStr: string): GDAction => dispatch(packetActions.logDataBatch(packetId, numGenRows, dataStr))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Engine);

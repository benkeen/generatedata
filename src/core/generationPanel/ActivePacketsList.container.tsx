import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/packets/packets.actions';
import * as selectors from '../store/packets/packets.selectors';
import ActivePacketsList, { ActivePacketsListProps } from './ActivePacketsList.component';

const mapStateToProps = (state: any): Partial<ActivePacketsListProps> => ({
	packetList: selectors.getActivePacketList(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<ActivePacketsListProps> => ({
	openPacket: (packetId: string): Action => dispatch(actions.showActivityPanel(packetId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivePacketsList);

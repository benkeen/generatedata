import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '~store/packets/packets.actions';
import * as selectors from '~store/packets/packets.selectors';
import ActivePacketsList, { ActivePacketsListProps } from './ActivePacketsList.component';

const mapStateToProps = (state: any): Pick<ActivePacketsListProps, 'packetList'> => ({
  packetList: selectors.getActivePacketList(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<ActivePacketsListProps, 'openPacket'> => ({
  // @ts-ignore
  openPacket: (packetId: string, navigate: any): any => dispatch(actions.showActivityPanel(packetId, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivePacketsList);

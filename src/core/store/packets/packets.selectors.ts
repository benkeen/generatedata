import { Store } from '~types/general';
import { createSelector } from 'reselect';
import { DataPackets } from './packets.reducer';

export const getVisiblePacketId = (state: Store): string | null => state.packets.visiblePacketId;
export const getPacketIds = (state: Store): string[] => state.packets.packetIds;
export const getPackets = (state: Store): DataPackets => state.packets.packets;

export const getVisiblePacket = createSelector(
	getVisiblePacketId,
	getPackets,
	(packetId, packets) => packetId ? packets[packetId] : null
);

// returns true/false if there's anything currently in the process of being generated
export const isGenerating = createSelector(
	getPackets,
	(packets) => Object.keys(packets).some((i: string) => packets[i].endTime === null)
);


// returns an ordered list of packet info for displaying some pills in the footer
export const getActivePacketList = createSelector(
	getPacketIds,
	(packetIds) => {
		return [];
	}
);

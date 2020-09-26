import { Store } from '~types/general';
import { createSelector } from 'reselect';
import { DataPackets } from './packets.reducer';

export const getCurrentPacketId = (state: Store): string | null => state.packets.currentPacketId;
export const getPacketIds = (state: Store): string[] => state.packets.packetIds;
export const getPackets = (state: Store): DataPackets => state.packets.packets;

export const getCurrentPacket = createSelector(
	getCurrentPacketId,
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

export const getBatchLoadTimes = createSelector(
	getCurrentPacketId,
	getPackets,
	(packetId, packets) => {
		if (!packetId) {
			return [];
		}

		return packets[packetId].data.map(({ endTime }, index) => {
			let duration;
			if (index === 0) {
				duration = endTime - packets[packetId].startTime;
			} else {
				duration = endTime - packets[packetId].data[index-1].endTime;
			}

			return {
				label: index+1,
				duration
			};
		});
	}
);

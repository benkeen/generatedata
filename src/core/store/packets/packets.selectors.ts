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
	getPackets,
	(packetIds, packets) => {
		return packetIds.map((packetId: string) => {
			const packet = packets[packetId];

			return {
				packetId,
				label: packet.config.numRowsToGenerate.toString() + ' rows', // when we get into saving data sets, this'll be the name
				percentage: (packet.numGeneratedRows / packet.config.numRowsToGenerate) * 100,
				isPaused: packet.isPaused,
				numRowsToGenerate: packet.config.numRowsToGenerate
			};
		});
	}
);

export const getBatchLoadTimes = createSelector(
	getCurrentPacket,
	(packet) => {
		if (!packet) {
			return [];
		}

		return packet.data.map(({ endTime }, index) => {
			let duration;
			if (index === 0) {
				duration = endTime - packet.startTime;
			} else {
				duration = endTime - packet.data[index-1].endTime;
			}
			return {
				label: index+1,
				duration
			};
		});
	}
);

// may as well format it in this method too
export const getGeneratedDataSize = createSelector(
	getCurrentPacket,
	(packet) => {
		return packet ? packet.stats.totalSize : null;
	}
);

export const getCompletedDataString = createSelector(
	getCurrentPacket,
	(packet) => {
		if (!packet) {
			return '';
		}

		let str = '';
		packet.data.forEach(({ dataStr }) => str += dataStr);

		return str;
	}
);


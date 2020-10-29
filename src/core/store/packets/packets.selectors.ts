import { Store } from '~types/general';
import { createSelector } from 'reselect';
import { DataPackets } from './packets.reducer';
import prettyBytes from 'pretty-bytes';
import { getFormattedNum } from '~utils/numberUtils';
import { formatDuration } from '~utils/dateUtils';
import { getLocale } from '../main/main.selectors';
import C from '../../constants';

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
	getLocale,
	(packetIds, packets, locale) => {
		return packetIds.map((packetId: string) => {
			const packet = packets[packetId];

			return {
				packetId,
				label: getFormattedNum(packet.config.numRowsToGenerate, locale) + ' rows', // when we get into saving data sets, this'll be the name
				percentage: (packet.numGeneratedRows / packet.config.numRowsToGenerate) * 100,
				isPaused: packet.isPaused,
				numRowsToGenerate: packet.config.numRowsToGenerate
			};
		});
	}
);

export const getLoadTimeDuration = createSelector(
	getCurrentPacket,
	(packet) => packet!.loadTimeGraphDuration
);

export const getLoadTimeDurationOptions = createSelector(
	getCurrentPacket,
	(packet) => {
		if (!packet) {
			return null;
		}
	}
);

export const getBatchLoadTimes = createSelector(
	getCurrentPacket,
	(packet) => {
		if (!packet) {
			return [];
		}

		const numSecondsToShow = 30;
		let seconds = Object.keys(packet.stats.rowGenerationRatePerSecond);

		const numLoadedSeconds = seconds.length;
		if (numLoadedSeconds < numSecondsToShow) {
			for (let i=numLoadedSeconds; i<=numSecondsToShow; i++) {
				seconds.push(i.toString());
			}
		} else {
			seconds = seconds.slice(numLoadedSeconds - numSecondsToShow - 1);
		}

		return seconds.map((secondStr) => {
			const secondNum = parseInt(secondStr, 10);
			const isComplete = secondNum <= packet.stats.lastCompleteLoggedSecond;
			const rowsPerSecond = isComplete && packet.stats.rowGenerationRatePerSecond[secondNum] || 0;

			return {
				label: secondStr,
				rowsPerSecond
			};
		});
	}
);

export const getPacketTotalSize = createSelector(
	getCurrentPacket,
	(packet) => {
		return packet ? packet.stats.totalSize : 0;
	}
);

// may as well format it in this method too
export const getGeneratedDataSizeLabel = createSelector(
	getPacketTotalSize,
	(totalSize) => prettyBytes(totalSize)
);

export const getEstimatedDataSize = createSelector(
	getCurrentPacket,
	getPacketTotalSize,
	(packet, packetTotalSize) => {
		if (!packet || packet.numGeneratedRows === 0) {
			return '-';
		}
		return prettyBytes((packet.config.numRowsToGenerate / packet.numGeneratedRows) * packetTotalSize);
	}
);

export const getEstimatedTime = createSelector(
	getCurrentPacket,
	(packet): string => {
		if (!packet) {
			return '-';
		}
		const timeInMs = packet.stats.averageSpeed * (packet.config.numRowsToGenerate / C.GENERATION_BATCH_SIZE);
		return formatDuration(timeInMs / 1000);
	}
);

// export const getRemainingTime = createSelector(
// 	getCurrentPacket,
// 	(packet) => {
// 		// const remainingRows = packet.config.numRowsToGenerate - packet.numGeneratedRows;
// 	}
// );

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

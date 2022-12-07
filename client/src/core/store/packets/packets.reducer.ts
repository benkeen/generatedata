import { AnyAction } from 'redux';
import { nanoid } from 'nanoid';
import produce from 'immer';
import * as actions from './packets.actions';
import { ExportTypeFolder } from '../../../../_plugins';
import { getByteSize, getGraphDuration, getRowGenerationRatePerSecond } from '../../generationPanel/generation.helpers';
import C from '../../constants';
import * as mainActions from '../main/main.actions';
import { LoadTimeGraphDuration } from '~types/general';

type GeneratedDataBatch = {
	byteSize: number;
	dataStr: string;
	endTime: number;
};

export type DataPacket = {
	generationWorkerId: string;
	startTime: number | null;
	endTime: number | null;
	totalPauseDuration: number;
	lastPauseTime: number | null;
	resumeTime: number;
	isPaused: boolean;
	numGeneratedRows: number;
	numBatches: number;
	speed: number;
	loadTimeGraphDuration: LoadTimeGraphDuration;

	// this block contains the actual configuration data - data types and export type data - used in this generation packet
	config: {
		stripWhitespace: boolean;
		numRowsToGenerate: number;
		template: any;
		dataTypes: any;
		columns: any;
		exportType: ExportTypeFolder;
		exportTypeSettings: any;
	};

	// the actual generated data
	data: GeneratedDataBatch[];

	stats: {
		totalSize: number;
		averageSpeed: number;
		rowGenerationRatePerSecond: { [second: number]: number };
		lastBatchGenerationDuration: number;
		lastCompleteLoggedSecond: number;
	};
};

export type DataPackets = {
	[packetId: string]: DataPacket;
}

export type PacketsState = {
	currentPacketId: string | null;
	packetIds: string[];
	packets: DataPackets;
};

export const initialState: PacketsState = {
	currentPacketId: null,
	packetIds: [],
	packets: {}
};

export const getNewPacket = ({
	generationWorkerId, stripWhitespace, numRowsToGenerate, template, dataTypes, columns, exportType, exportTypeSettings
}: any): DataPacket => {
	const now = new Date().getTime();
	const loadTimeGraphDuration = getGraphDuration(numRowsToGenerate);

	return {
		generationWorkerId,
		startTime: now,
		endTime: null,
		totalPauseDuration: 0,
		resumeTime: now,
		isPaused: false,
		lastPauseTime: null,
		numGeneratedRows: 0,
		numBatches: 0,
		speed: 100,
		loadTimeGraphDuration,
		config: {
			stripWhitespace,
			numRowsToGenerate,
			template,
			dataTypes,
			columns,
			exportType,
			exportTypeSettings
		},
		data: [],
		stats: {
			totalSize: 0,
			averageSpeed: 0,
			rowGenerationRatePerSecond: {},
			lastCompleteLoggedSecond: 0,
			lastBatchGenerationDuration: 0
		}
	};
};

export const reducer = produce((draft: PacketsState, action: AnyAction) => {
	switch (action.type) {
		case mainActions.RESET_STORE:
			Object.keys(initialState).forEach((key) => {
				// @ts-ignore-line
				draft[key] = initialState[key];
			});
			break;

		case actions.START_GENERATION: {
			const {
				generationWorkerId, numRowsToGenerate, template, dataTypes, columns, exportType, exportTypeSettings, stripWhitespace
			} = action.payload;

			const packetId = nanoid();
			draft.packetIds.push(packetId);
			draft.packets[packetId] = getNewPacket({
				generationWorkerId,
				numRowsToGenerate,
				template,
				dataTypes,
				columns,
				exportType,
				exportTypeSettings,
				stripWhitespace
			});
			draft.currentPacketId = packetId;
			break;
		}

		case actions.PAUSE_GENERATION:
			draft.packets[action.payload.packetId].lastPauseTime = new Date().getTime();
			draft.packets[action.payload.packetId].isPaused = true;
			break;

		case actions.CONTINUE_GENERATION:
			const lastPauseTimeMs = draft.packets[action.payload.packetId].lastPauseTime;
			const pauseDuration = new Date().getTime() - lastPauseTimeMs!;
			draft.packets[action.payload.packetId].isPaused = false;
			draft.packets[action.payload.packetId].lastPauseTime = null;
			draft.packets[action.payload.packetId].totalPauseDuration += pauseDuration;
			break;

		case actions.ABORT_GENERATION: {
			const packetId = draft.currentPacketId as string;
			draft.currentPacketId = null;
			draft.packetIds.splice(draft.packetIds.indexOf(packetId), 1);
			delete draft.packets[packetId];
			break;
		}

		case actions.HIDE_ACTIVITY_PANEL:
			draft.currentPacketId = null;
			break;

		case actions.SHOW_ACTIVITY_PANEL:
			draft.currentPacketId = action.payload.packetId;
			break;

		case actions.CHANGE_SPEED: {
			if (draft.currentPacketId) {
				draft.packets[draft.currentPacketId].speed = action.payload.speed;
			}
			break;
		}

		// TODO yikes. TOTAAAAAALLLLY needs improving and testing. And maybe taking out behind the shed and shooting.
		case actions.LOG_DATA_BATCH: {
			const now = new Date().getTime();
			const { packetId, numGeneratedRows, dataStr } = action.payload;
			const byteSize = getByteSize(dataStr);

			// check for existence in case the user just cancelled and an orphaned response comes back
			if (!draft.packets[packetId]) {
				break;
			}

			const numExistingPackets = draft.packets[packetId].data.length;

			// the start time for this batch was either the previous completed batch, or for the very first one - the start
			// of the generation
			const startTime = numExistingPackets > 0 ?
				draft.packets[packetId].data[draft.packets[packetId].data.length-1].endTime :
				draft.packets[packetId].resumeTime;

			const duration = now - startTime;

			let newAverageSpeed = duration;
			if (numExistingPackets > 0) {
				newAverageSpeed = ((draft.packets[packetId].stats.averageSpeed * numExistingPackets) + duration) / (numExistingPackets + 1);
			}

			draft.packets[packetId].stats.averageSpeed = newAverageSpeed;
			draft.packets[packetId].stats.totalSize += byteSize;
			draft.packets[packetId].stats.lastBatchGenerationDuration = duration;


			draft.packets[packetId].numGeneratedRows = numGeneratedRows;
			draft.packets[packetId].data.push({
				dataStr,
				byteSize,
				endTime: now
			});

			const result = getRowGenerationRatePerSecond(draft.packets[packetId].resumeTime, startTime, now, C.GENERATION_BATCH_SIZE);

			const seconds = Object.keys(result);
			seconds.forEach((second) => {
				const secondNum = parseInt(second, 10);
				let currVal = draft.packets[packetId].stats.rowGenerationRatePerSecond[secondNum];
				if (currVal) {
					currVal += result[secondNum];
				} else {
					currVal = result[secondNum];
				}
				draft.packets[packetId].stats.rowGenerationRatePerSecond[secondNum] = currVal;
			});

			draft.packets[packetId].stats.lastCompleteLoggedSecond = parseInt(seconds[seconds.length-1], 10) - 1;
			break;
		}
	}
}, initialState);

export default reducer;

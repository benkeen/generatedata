import { AnyAction } from 'redux';
import { generate } from 'shortid';
import produce from 'immer';
import * as actions from './packets.actions';
import { ExportTypeFolder } from '../../../_plugins';
import { getByteSize, getRowGenerationRatePerSecond } from '../../generationPanel/generation.helpers';
import C from '../../constants';
import * as mainActions from '../main/main.actions';

type GeneratedDataBatch = {
	byteSize: number;
	dataStr: string;
	endTime: number;
};

export type LoadTimeGraphDuration = 'all' | '15seconds' | '30seconds' | '1minute';

export type DataPacket = {
	dataTypeWorkerId: string;
	exportTypeWorkerId: string;
	originalStartTime: number;
	resumeTime: number;
	endTime: Date | null;
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
		rowGenerationRatePerSecond: { [second: number]: number };
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
	dataTypeWorkerId, exportTypeWorkerId, stripWhitespace, numRowsToGenerate, template, dataTypes, columns,
	exportType, exportTypeSettings
}: any): DataPacket => {
	const now = performance.now();
	const loadTimeGraphDuration = numRowsToGenerate <= 1000 ? 'all' : '15seconds';

	return {
		dataTypeWorkerId,
		exportTypeWorkerId,
		originalStartTime: now,
		resumeTime: now,
		endTime: null,
		isPaused: false,
		numGeneratedRows: 0,
		numBatches: 0,
		speed: 80,
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
			rowGenerationRatePerSecond: {},
			lastCompleteLoggedSecond: 0
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
				dataTypeWorkerId, exportTypeWorkerId, numRowsToGenerate, template, dataTypes, columns,
				exportType, exportTypeSettings, stripWhitespace
			} = action.payload;

			const packetId = generate();
			draft.packetIds.push(packetId);
			draft.packets[packetId] = getNewPacket({
				dataTypeWorkerId,
				exportTypeWorkerId,
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
			draft.packets[action.payload.packetId].isPaused = true;
			break;

		case actions.CONTINUE_GENERATION:
			draft.packets[action.payload.packetId].isPaused = false;
			break;

		case actions.ABORT_GENERATION:
			const packetId = draft.currentPacketId as string;
			draft.currentPacketId = null;
			draft.packetIds.splice(draft.packetIds.indexOf(packetId), 1);
			delete draft.packets[packetId];
			break;

		case actions.HIDE_ACTIVITY_PANEL:
			draft.currentPacketId = null;
			break;

		case actions.SHOW_ACTIVITY_PANEL:
			draft.currentPacketId = action.payload.packetId;
			break;

		case actions.LOG_DATA_BATCH: {
			const now = performance.now();
			const { packetId, numGeneratedRows, dataStr } = action.payload;
			const byteSize = getByteSize(dataStr);

			// check for existence in case the user just cancelled and an orphaned response comes back
			if (!draft.packets[packetId]) {
				break;
			}

			// the start time for this batch was either the previous completed batch, or for the very first one, the start
			// of the generation
			const startTime = draft.packets[packetId].data.length ?
				draft.packets[packetId].data[draft.packets[packetId].data.length-1].endTime :
				draft.packets[packetId].resumeTime;

			draft.packets[packetId].numGeneratedRows = numGeneratedRows;
			draft.packets[packetId].data.push({
				dataStr,
				byteSize,
				endTime: now
			});
			draft.packets[packetId].stats.totalSize += byteSize;

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

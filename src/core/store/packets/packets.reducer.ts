import { AnyAction } from 'redux';
import { generate } from 'shortid';
import produce from 'immer';
import * as actions from './packets.actions';
import { ExportTypeFolder } from '../../../_plugins';

type GeneratedDataBatch = {
	byteSize: number;
	dataStr: string;
	endTime: number;
};

export type DataPacket = {
	dataTypeWorkerId: string;
	exportTypeWorkerId: string;
	startTime: number;
	endTime: Date | null;
	isPaused: boolean;
	numGeneratedRows: number;
	numBatches: number;
	speed: number;

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

	// information about the generated data
	data: GeneratedDataBatch[];
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

const getNewPacket = ({
	dataTypeWorkerId, exportTypeWorkerId, stripWhitespace, numRowsToGenerate, template, dataTypes, columns,
	exportType, exportTypeSettings
}: any): DataPacket => ({
	dataTypeWorkerId,
	exportTypeWorkerId,
	startTime: performance.now(),
	endTime: null,
	isPaused: false,
	numGeneratedRows: 0,
	numBatches: 0,
	speed: 80,
	config: {
		stripWhitespace,
		numRowsToGenerate,
		template,
		dataTypes,
		columns,
		exportType,
		exportTypeSettings
	},
	data: []
});

export const reducer = produce((draft: PacketsState, action: AnyAction) => {
	switch (action.type) {
		case actions.START_GENERATION: {
			const {
				dataTypeWorkerId, exportTypeWorkerId, numRowsToGenerate, template, dataTypes, columns,
				exportType, exportTypeSettings
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
				exportTypeSettings
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
			break;

		case actions.HIDE_ACTIVITY_PANEL:
			draft.currentPacketId = null;
			break;

		case actions.SHOW_ACTIVITY_PANEL:
			draft.currentPacketId = action.payload.packetId;
			break;

		case actions.LOG_DATA_BATCH: {
			const { packetId, numGeneratedRows, dataStr } = action.payload;

			draft.packets[packetId].numGeneratedRows = numGeneratedRows;
			draft.packets[packetId].data.push({
				dataStr,
				byteSize: dataStr.length,
				endTime: performance.now()
			});
		}
	}
}, initialState);

export default reducer;

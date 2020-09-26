import { AnyAction } from 'redux';
import { generate } from 'shortid';
import produce from 'immer';
import * as actions from '../generator/generator.actions';

// a "packet" is an name for some generation going on. A user can have multiple packets running simultaneously via the UI.
export type DataPacket = {
	dataTypeWorkerId: string;
	exportTypeWorkerId: string;
	startTime: Date;
	endTime: Date | null;
	isPaused: boolean;
	numGeneratedRows: number;
	numBatches: number;
	speed: number;
	data: {
		numRowsToGenerate: number;
		template: any;
		dataTypes: any;
		columns: any;
	};
};

export type DataPackets = {
	[packetId: string]: DataPacket;
}

export type DataState = {
	visiblePacketId: string | null;
	packetIds: string[];
	packets: {
		[batchId: string]: DataPacket;
	};
};

export const initialState: DataState = {
	visiblePacketId: null,
	packetIds: [],
	packets: {}
};

const getNewDataBatch = ({ dataTypeWorkerId, exportTypeWorkerId, numRowsToGenerate, template, dataTypes, columns }: any): DataPacket => ({
	dataTypeWorkerId,
	exportTypeWorkerId,
	startTime: new Date(),
	endTime: null,
	isPaused: false,
	numGeneratedRows: 0,
	numBatches: 0,
	speed: 100,
	data: {
		numRowsToGenerate,
		template,
		dataTypes,
		columns
	}
});

export const reducer = produce((draft: DataState, action: AnyAction) => {
	switch (action.type) {
		case actions.START_GENERATION:
			const { dataTypeWorkerId, exportTypeWorkerId, numRowsToGenerate, template, dataTypes, columns } = action.payload;

			const batchId = generate();
			draft.batchIds.push(batchId);
			draft.batches[batchId] = getNewDataBatch({
				dataTypeWorkerId,
				exportTypeWorkerId,
				numRowsToGenerate,
				template,
				dataTypes,
				columns
			});
			draft.visibleBatchId = batchId;
			break;

		// case actions.CANCEL_GENERATION:
			// draft.isGenerating = false;
			// draft.numGeneratedRows = 0;
			// break;
	}
}, initialState);

export default reducer;

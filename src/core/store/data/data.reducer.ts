import { AnyAction } from 'redux';
import { generate } from 'shortid';
import produce from 'immer';
import * as actions from '../generator/generator.actions';

type DataBatch = {
	startTime: Date;
	endTime: Date | null;
	numGeneratedRows: number;
	numBatches: number;
	speed: number;
	data: {
		numRowsToGenerate: number;
		template: any
	}
};

export type DataState = {
	currentBatchId: string | null;
	batchIds: string[];
	batches: {
		[batchId: string]: DataBatch;
	};
};

export const initialState: DataState = {
	currentBatchId: null,
	batchIds: [],
	batches: {}
};

const getNewDataBatch = ({ numRowsToGenerate, template }: any): DataBatch => ({
	startTime: new Date(),
	endTime: null,
	numGeneratedRows: 0,
	numBatches: 0,
	speed: 100,
	data: {
		numRowsToGenerate,
		template
	}
});

export const reducer = produce((draft: DataState, action: AnyAction) => {
	switch (action.type) {
		case actions.START_GENERATION:
			const batchId = generate();
			draft.batchIds.push(batchId);
			draft.batches[batchId] = getNewDataBatch({
				...action.payload
			});
			draft.currentBatchId = batchId;
			break;
	}
}, initialState);

export default reducer;

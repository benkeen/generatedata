import { AnyAction } from 'redux';
import { generate } from 'shortid';
import produce from 'immer';
import * as actions from '../generator/generator.actions';

type DataBatch = {
	startTime: Date;
	endTime: Date | null;
	numGeneratedRows: number;
	numBatches: number;
	speed: number
};
export type DataState = {
	batchIds: string[];
	batches: {
		[batchId: string]: DataBatch;
	};
};

export const initialState: DataState = {
	batchIds: [],
	batches: {}
};

const getNewDataBatch = (): DataBatch => ({
	startTime: new Date(),
	endTime: null,
	numGeneratedRows: 0,
	numBatches: 0,
	speed: 100
});

export const reducer = produce((draft: DataState, action: AnyAction) => {
	switch (action.type) {
		case actions.START_GENERATION:
			const batchId = generate();
			draft.batchIds.push(batchId);
			draft.batches[batchId] = getNewDataBatch();
			break;

		// case actions.BATCH_PROCESSED:
		// 	draft.
		// 	break;
	}
}, initialState);

export default reducer;

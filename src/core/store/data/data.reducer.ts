import { AnyAction } from 'redux';
// import { generate } from 'shortid';
import produce from 'immer';

type DataBatch = {
	generationStartTime: number;
	generationEndTime: number;
	numGeneratedRows: number;
	numBatches: number;
	batchGenerationTime: number[];
};

export type DataState = {
	batchIds: [],
	generationSpeed: 100,
	batches: DataBatch[];
};

export const initialState: DataState = {
	batchIds: [],
	generationSpeed: 100,
	batches: []
};

export const reducer = produce((draft: DataState, action: AnyAction) => {
	switch (action.type) {
		case actions.CLEAR_GRID:
			draft.rows = {};
			draft.sortedRows = [];
			break;
	}
}, initialState);

export default reducer;

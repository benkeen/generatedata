import { Store } from '~types/general';
import { createSelector } from 'reselect';
import { DataBatches } from './data.reducer';

export const getVisibleBatchId = (state: Store): string | null => state.data.visibleBatchId;
export const getBatchIds = (state: Store): string[] => state.data.batchIds;
export const getBatches = (state: Store): DataBatches => state.data.batches;

export const getCurrentBatch = createSelector(
	getVisibleBatchId,
	getBatches,
	(batchId, batches) => batchId ? batches[batchId] : null
);

// any batches in the process of being generated don't have their endTime set
export const isGenerating = createSelector(
	getBatches,
	(batches) => Object.keys(batches).some((i: string) => batches[i].endTime === null)
);

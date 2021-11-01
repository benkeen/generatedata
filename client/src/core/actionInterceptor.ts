import { Store } from 'redux';
import { getRows } from '~store/generator/generator.selectors';
import { DataRow } from '~store/generator/generator.reducer';
import { onConfigureDataType } from '~store/generator/generator.actions';
import { DataTypeFolder } from '../../_plugins';
import { DTActionInterceptors, DTInterceptorSingleAction } from '~types/dataTypes';

// TODO what if onload, a user interacts with a pre-saved config prior to the data type loading and the interceptor
// isn't registered yet? Other than defensively coding the Data Type generation I'm not sure how to handle that... I
// guess we could also lock down the UI...
const actionInterceptors: any = {};
export const registerInterceptors = (dataType: DataTypeFolder, interceptors: DTActionInterceptors): void => {
	Object.keys(interceptors).forEach((action) => {
		if (!actionInterceptors[action]) {
			actionInterceptors[action] = [];
		}
		actionInterceptors[action].push({
			dataType,
			// singular, note. A single DataType only every supplies a single interceptor for a single action
			interceptor: interceptors[action]
		});
	});
};

export const getActionInterceptors = (action: string): DTInterceptorSingleAction[] => {
	return actionInterceptors[action] ? actionInterceptors[action]: [];
};

const actionInterceptor = (store: Store) => (next: any): any => (action: any): any => {
	// returns all interceptors for the current action
	const interceptors = action && action.type ? getActionInterceptors(action.type) : [];

	if (interceptors.length) {
		const rows = getRows(store.getState());
		interceptors.forEach(({ dataType, interceptor }) => {
			Object.keys(rows).forEach((rowId: string) => {
				const row: DataRow = rows[rowId];
				if (row.dataType === dataType) {
					const result = interceptor(rowId, row.data, action.payload);
					if (result) {
						// TODO note: interceptors don't currently support options metadata. e.g. the Names DataType
						// onUpdate() returns both the new row state, but also some metadata that tells the core
						// script to load the country names. Hence the `undefined` 3rd param here.
						store.dispatch(onConfigureDataType(rowId, result, undefined, true));
					}
				}
			});
		});
	}

	return next(action);
};

export default actionInterceptor;

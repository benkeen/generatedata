import { Store } from 'redux';
import { getRows } from './store/generator/generator.selectors';
import { DataTypeFolder } from '../../_plugins';
import { DataRow } from './store/generator/generator.reducer';
import { DTActionInterceptors, DTInterceptorSingleAction } from '~types/dataTypes';
import { onConfigureDataType } from './store/generator/generator.actions';

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
						store.dispatch(onConfigureDataType(rowId, result, true));
					}
				}
			});
		});
	}

	return next(action);
};

export default actionInterceptor;

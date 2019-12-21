import * as selectors from './generator.selectors';

export const ADD_ROWS = 'ADD_ROWS';

export const addRows = (numRows: number) => ({
	type: ADD_ROWS,
	payload: {
		numRows
	}
});

export const REMOVE_ROW = 'REMOVE_ROW';
export const removeRow = (id: string) => ({ type: REMOVE_ROW, payload: { id } });

export const CHANGE_TITLE = 'CHANGE_TITLE';
export const onChangeTitle = (id: string, value: string) => ({
	type: CHANGE_TITLE,
	payload: {
		id, value
	}
});

export const SELECT_DATA_TYPE = 'SELECT_DATA_TYPE';
export const onSelectDataType = (id: string, value: string) => ({
	type: SELECT_DATA_TYPE,
	payload: {
		id, value
	}
});

export const CONFIGURE_DATA_TYPE = 'CONFIGURE_DATA_TYPE';
export const onConfigureDataType = (id: string, data: any) => ({
	type: CONFIGURE_DATA_TYPE,
	payload: {
		id, data
	}
});

export const generate = () => {
	return (dispatch: any, getState: any) => {
		const state = getState();

		console.log(selectors.getSortedRowsArray(state));
	};
};

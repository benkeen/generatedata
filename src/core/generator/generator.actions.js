export const ADD_ROWS = 'ADD_ROWS';

export const addRows = (numRows) => ({
	type: ADD_ROWS,
	payload: {
		numRows
	}
});

export const REMOVE_ROW = 'REMOVE_ROW';
export const removeRow = (id) => ({ type: REMOVE_ROW, payload: { id } });

export const SELECT_DATA_TYPE = 'SELECT_DATA_TYPE';
export const onSelectDataType = (id, value) => ({
	type: SELECT_DATA_TYPE,
	payload: {
		id, value
	}
});

export const CONFIGURE_DATA_TYPE = 'CONFIGURE_DATA_TYPE';
export const onConfigureDataType = (id, data) => ({
	type: CONFIGURE_DATA_TYPE,
	payload: {
		id, data
	}
});

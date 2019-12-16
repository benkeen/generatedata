export const ADD_ROWS = 'ADD_ROWS';

export const addRows = (numRows) => ({
	type: ADD_ROWS,
	payload: {
		numRows
	}
});

export const REMOVE_ROW = 'REMOVE_ROW';
export const removeRow = (id) => ({ type: REMOVE_ROW, payload: { id } });

export const CHANGE_DATA_TYPE = 'CHANGE_DATA_TYPE';
export const onChangeDataType = (id, value) => ({
	type: CHANGE_DATA_TYPE,
	payload: {
		id, value
	}
});

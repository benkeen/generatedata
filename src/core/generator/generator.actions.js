export const ADD_ROWS = 'ADD_ROWS';

export const addRows = (numRows) => ({
	type: ADD_ROWS,
	payload: {
		numRows
	}
});

export const DELETE_ROW = 'DELETE_ROW';

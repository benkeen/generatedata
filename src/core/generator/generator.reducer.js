import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './generator.actions';

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
const reducer = (state = {
	rows: [],
	dataTypes: [],
	exportTypes: [],
	countries: []
}, action) => {
	switch (action.type) {
		case actions.ADD_ROWS:
			const newRows = [];
			for (let i=0; i<action.payload.numRows; i++) {
				newRows.push({
					dataType: null,
					options: null,
					example: null
				});
			}
			return {
				rows: [
					...state.rows,
					...newRows
				]
			};

		case actions.DELETE_ROW:
			break;

		default:
			return state;
	}
};

reducerRegistry.register('generator', reducer);

import reducerRegistry from '../../store/reducerRegistry';

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
const reducer = (state = {
	rows: []
}, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

reducerRegistry.register('init', reducer);

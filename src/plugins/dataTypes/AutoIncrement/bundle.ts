import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './AutoIncrement.ui';
import { rowStateReducer, generate, getMetadata } from './AutoIncrement.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	rowStateReducer,
	getMetadata
};

export default bundle;

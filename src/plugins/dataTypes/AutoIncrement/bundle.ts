import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './AutoIncrement.ui';
import { rowStateReducer, getMetadata } from './AutoIncrement.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

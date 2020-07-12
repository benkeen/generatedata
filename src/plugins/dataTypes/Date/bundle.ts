import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options } from './Date.ui';
import { rowStateReducer, getMetadata } from './Date.generate';

const bundle: DTBundle = {
	initialState,
	rowStateReducer,
	Help,
	Example,
	Options,
	getMetadata
};

export default bundle;

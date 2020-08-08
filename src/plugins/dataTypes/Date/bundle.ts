import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options, rowStateReducer, getMetadata } from './Date.ui';

const bundle: DTBundle = {
	initialState,
	rowStateReducer,
	Help,
	Example,
	Options,
	getMetadata
};

export default bundle;

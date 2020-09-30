import { DTBundle } from '~types/dataTypes';
import { initialState, rowStateReducer, Help, Options, getMetadata } from './NumberRange';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

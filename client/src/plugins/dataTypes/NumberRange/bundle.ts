import { DTBundle } from '~types/dataTypes';
import { rowStateReducer, Help, Options, getMetadata } from './NumberRange';
import { initialState } from './NumberRange.state';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options } from './NumberRange';
import { rowStateReducer, getMetadata } from './NumberRange.generator';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

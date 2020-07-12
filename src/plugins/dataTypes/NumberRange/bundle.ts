import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Options } from './NumberRange.ui';
import { rowStateReducer, getMetadata } from './NumberRange.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

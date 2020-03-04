import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Help, Options } from './NumberRange.ui';
import { rowStateReducer, generate, getMetadata } from './NumberRange.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};

export default bundle;

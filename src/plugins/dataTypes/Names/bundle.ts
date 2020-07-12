import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './Names.ui';
import { getMetadata, rowStateReducer } from './Names.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;

import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './Names.ui';
import { generate, getMetadata, rowStateReducer } from './Names.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	getMetadata,
	rowStateReducer
};

export default bundle;

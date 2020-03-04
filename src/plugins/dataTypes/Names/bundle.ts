import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './Names.ui';
import { generate, getMetadata } from './Names.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;

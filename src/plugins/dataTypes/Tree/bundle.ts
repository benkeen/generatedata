import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options, Help } from './Tree.ui';
import { generate, getMetadata } from './Tree.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
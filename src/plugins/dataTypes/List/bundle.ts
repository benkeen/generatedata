import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './List.ui';
import { generate, getMetadata } from './List.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;

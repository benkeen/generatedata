import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Options, Help } from './TextFixed.ui';
import { generate, getMetadata } from './TextFixed.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
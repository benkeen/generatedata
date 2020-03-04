import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Help, Example, Options } from './Date.ui';
import { generate, getMetadata } from './Date.generate';

const bundle: DTBundle = {
	initialState,
	Help,
	Example,
	Options,
	generate,
	getMetadata
};

export default bundle;
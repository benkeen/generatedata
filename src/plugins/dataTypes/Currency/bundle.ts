import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Help, Example, Options } from './Currency.ui';
import { generate, getMetadata } from './Currency.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
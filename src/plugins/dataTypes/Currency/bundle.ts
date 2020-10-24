import { DTBundle } from '~types/dataTypes';
import { initialState, Help, Example, Options } from './Currency';
import { getMetadata } from './Currency.generator';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;

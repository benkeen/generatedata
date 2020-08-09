import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './List';
import { getMetadata } from './List.generator';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;

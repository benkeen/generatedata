import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './List.ui';
import { getMetadata } from './List.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;

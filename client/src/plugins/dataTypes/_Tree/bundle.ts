import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './Tree';
import { getMetadata } from './Tree.generator';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;

import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './Tree.ui';
import { getMetadata } from './Tree.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;

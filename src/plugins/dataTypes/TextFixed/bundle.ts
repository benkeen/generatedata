import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './TextFixed.ui';
import { getMetadata } from './TextFixed.generate';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;

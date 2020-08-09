import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help } from './TextFixed';
import { getMetadata } from './TextFixed.generator';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata
};

export default bundle;

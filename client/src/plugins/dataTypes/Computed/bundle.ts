import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, getMetadata } from './Computed';
import { initialState } from './Computed.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;

import { DTBundle } from '~types/dataTypes';
import { Help, Example, Options, getMetadata } from './Currency';
import { initialState } from './Currency.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;

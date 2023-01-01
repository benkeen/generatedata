import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, rowStateReducer, getMetadata } from './Phone';
import { initialState } from './Phone.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

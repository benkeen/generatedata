import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, rowStateReducer, getMetadata } from './Phone';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

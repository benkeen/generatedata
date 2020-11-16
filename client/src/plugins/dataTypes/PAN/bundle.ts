import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './PAN';
import { rowStateReducer, getMetadata } from './PAN.generator';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

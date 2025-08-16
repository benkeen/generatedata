import { DTBundle } from '~types/dataTypes';
import { Help, Example, Options, rowStateReducer, getMetadata } from './Date';
import { initialState } from './Date.state';

const bundle: DTBundle = {
	initialState,
	rowStateReducer,
	Help,
	Example,
	Options,
	getMetadata
};

export default bundle;

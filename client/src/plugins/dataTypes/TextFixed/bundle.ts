import { DTBundle } from '~types/dataTypes';
import { initialState, Options, Help, getMetadata, rowStateReducer } from './TextFixed';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;

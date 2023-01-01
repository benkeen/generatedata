import { DTBundle } from '~types/dataTypes';
import { Options, Help, getMetadata, rowStateReducer } from './TextFixed';
import { initialState } from './TextFixed.state';

const bundle: DTBundle = {
	initialState,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;

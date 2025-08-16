import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, rowStateReducer, getMetadata } from './PAN';
import { initialState } from './PAN.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

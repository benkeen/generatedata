import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, rowStateReducer, getMetadata } from './Boolean';
import { initialState } from './Boolean.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

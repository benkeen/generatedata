import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, rowStateReducer, getMetadata } from './AutoIncrement';
import { initialState } from './AutoIncrement.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata,
};

export default bundle;

import { DTBundle } from '~types/dataTypes';
import { Help, Example, Options, rowStateReducer, getMetadata } from './Time';
import { initialState } from './Time.state';

const bundle: DTBundle = {
	initialState,
	rowStateReducer,
	Help,
	Example,
	Options,
	getMetadata
};

export default bundle;

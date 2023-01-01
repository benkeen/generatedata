import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, getMetadata, rowStateReducer } from './List';
import { initialState } from './List.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;

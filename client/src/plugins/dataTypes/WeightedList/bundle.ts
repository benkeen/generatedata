import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, getMetadata, rowStateReducer } from './WeightedList';
import { initialState } from './WeightedList.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;

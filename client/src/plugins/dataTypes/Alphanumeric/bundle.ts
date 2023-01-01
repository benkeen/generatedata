import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, rowStateReducer, getMetadata } from './Alphanumeric';
import { initialState } from './Alphanumeric.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

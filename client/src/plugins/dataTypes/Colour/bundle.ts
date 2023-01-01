import { DTBundle } from '~types/dataTypes';
import { Example, Options, Help, getMetadata, rowStateReducer } from './Colour';
import { initialState } from './Colour.state';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	rowStateReducer
};

export default bundle;

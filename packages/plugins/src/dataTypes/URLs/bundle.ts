import { DTBundle } from '~types/dataTypes';
import { Example, Options, getMetadata, rowStateReducer } from './URLs';
import { initialState } from './URLs.state';

const bundle: DTBundle = {
	Example,
	Options,
	initialState,
	getMetadata,
	rowStateReducer
};

export default bundle;

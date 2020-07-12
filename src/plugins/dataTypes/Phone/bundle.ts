import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './Phone.ui';
import { rowStateReducer, getMetadata } from './Phone.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

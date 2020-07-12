import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help } from './Boolean.ui';
import { rowStateReducer, getMetadata } from './Boolean.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	getMetadata
};

export default bundle;

import { DTBundle } from '../../../../types/dataTypes';
import { initialState, Example, Options, Help } from './PAN.ui';
import { rowStateReducer, generate, getMetadata } from './PAN.generate';

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};

export default bundle;

import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Phone.ui';
import { rowStateReducer, generate, getMetadata } from './Phone.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};

export default bundle;

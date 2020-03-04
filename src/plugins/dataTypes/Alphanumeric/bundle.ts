import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Alphanumeric.ui';
import { rowStateReducer, generate, getMetadata } from './Alphanumeric.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	generate,
	rowStateReducer,
	getMetadata
};

export default bundle;

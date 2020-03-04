import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Boolean.ui';
import { rowStateReducer, generate, getMetadata } from './Boolean.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	generate,
	rowStateReducer,
	getMetadata
};

export default bundle;

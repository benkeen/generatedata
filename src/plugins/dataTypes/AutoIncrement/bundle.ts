import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './AutoIncrement.ui';
import { rowStateReducer, generate, getMetadata } from './AutoIncrement.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	generate,
	rowStateReducer,
	getMetadata
};

export default bundle;

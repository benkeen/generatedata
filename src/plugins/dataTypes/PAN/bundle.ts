import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './PAN.ui';
import { rowStateReducer, generate, getMetadata } from './PAN.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};

export default bundle;

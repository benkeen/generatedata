import { DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Names.ui';
import { generate, getMetadata } from './Names.generate';

const bundle: DTBundle = {
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;

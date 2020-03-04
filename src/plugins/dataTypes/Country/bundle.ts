import { DTBundle } from '../../../../types/dataTypes';
import { Options } from './Country.ui';
import { generate, getMetadata } from './Country.generate';

const bundle: DTBundle = {
	Options,
	generate,
	getMetadata
};

export default bundle;
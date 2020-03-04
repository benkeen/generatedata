import { DTBundle } from '../../../../types/dataTypes';
import { Help } from './Company.ui';
import { generate, getMetadata } from './Company.generate';

const bundle: DTBundle = {
	Help,
	generate,
	getMetadata
};

export default bundle;

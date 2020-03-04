import { DTBundle } from '../../../../types/dataTypes';
import { Help } from './PIN.ui';
import { generate, getMetadata } from './PIN.generate';

const bundle: DTBundle = {
	Help,
	generate,
	getMetadata
};

export default bundle;

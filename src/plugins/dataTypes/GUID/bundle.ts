import { DTBundle } from '../../../../types/dataTypes';
import { Help } from './GUID.ui';
import { generate, getMetadata } from './GUID.generate';

const bundle: DTBundle = {
	Help,
	generate,
	getMetadata
};

export default bundle;

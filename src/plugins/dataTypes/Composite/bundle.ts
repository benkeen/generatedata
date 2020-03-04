import { DTBundle } from '../../../../types/dataTypes';
import { Help } from './Composite.ui';
import { generate, getMetadata } from './Composite.generate';

const bundle: DTBundle = {
	Help,
	generate,
	getMetadata
};

export default bundle;

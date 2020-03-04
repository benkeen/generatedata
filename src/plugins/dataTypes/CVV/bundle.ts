import { DTBundle } from '../../../../types/dataTypes';
import { Help } from './CVV.ui';
import { generate, getMetadata } from './CVV.generate';

const bundle: DTBundle = {
	Help,
	generate,
	getMetadata
};

export default bundle;
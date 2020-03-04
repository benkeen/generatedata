import { DTBundle } from '../../../../types/dataTypes';
import { Help } from './IBAN.ui';
import { generate, getMetadata } from './IBAN.generate';

const bundle: DTBundle = {
	Help,
	generate,
	getMetadata
};

export default bundle;
